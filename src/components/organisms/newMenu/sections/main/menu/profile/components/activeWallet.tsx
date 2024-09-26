import { useState } from "react";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { useDispatch } from "react-redux";
import { fetchLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import CustomTooltip from "components/atoms/materialTooltip";

import useAlert from "hooks/alertProvider/useAlert";

import styled from "../styled.module.scss";

const ActiveWallet = ({ address, btnDisabled, setBtnDisabled }: any) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const dispatch = useDispatch();

  const setActiveWallet = async (address: string) => {
    setLoading(true);
    setBtnDisabled(true);
    await customAxios()
      .post("/wallet/active", { address })
      .then(async () => {
        await dispatch(fetchLeaderboard() as any);
        setAlert("Activated successfully", "success");
        setLoading(false);
        setBtnDisabled(false);
      })
      .catch((error: any) => {
        setLoading(false);
        setBtnDisabled(false);
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  return (
    <>
      {loading ? (
        <CircularProgress className={styled.spinner} size={20} />
      ) : (
        <CustomTooltip title={"Set Active Wallet"}>
          <CheckIcon
            sx={{ cursor: "pointer", pointerEvents: btnDisabled ? "none" : "auto" }}
            onClick={() => setActiveWallet(address)}
          />
        </CustomTooltip>
      )}
    </>
  );
};

export default ActiveWallet;
