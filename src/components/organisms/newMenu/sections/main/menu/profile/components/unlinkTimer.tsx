import { useState } from "react";
import { Box, CircularProgress, Link, Typography } from "@mui/material";

import LinkOffIcon from "@mui/icons-material/LinkOff";
import CustomTooltip from "components/atoms/materialTooltip";

import customAxios from "utils/customAxios";
import useAlert from "hooks/alertProvider/useAlert";

import styled from "../styled.module.scss";
import { useDispatch } from "react-redux";
import { fetchLeaderboard } from "reduxConfig/thunks/leaderboard";

const LIMIT_TIMER = 10;

const UnlinkTimmer = ({ address }: any) => {
  const [unLinkTimer, setUnLinkTimer] = useState(LIMIT_TIMER);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { setAlert } = useAlert();

  const initUnlink = () => {
    setUnLinkTimer((prev) => prev - 1);

    let counter = 0;
    const timer = setInterval(() => {
      counter++;
      if (counter < LIMIT_TIMER) {
        setUnLinkTimer((prev) => prev - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };

  const confirm = () => {
    unlinkWallet(address);
    setUnLinkTimer(LIMIT_TIMER);
  };

  const unlinkWallet = async (address: string) => {
    setLoading(true);
    await customAxios()
      .post("/wallet/unlink", { address })
      .then(async () => {
        await dispatch(fetchLeaderboard() as any);
        setAlert("Unlink successfully", "success");
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  return (
    <>
      {loading ? (
        <CircularProgress className={styled.spinner} size={20} />
      ) : (
        <>
          {unLinkTimer === LIMIT_TIMER && (
            <CustomTooltip title={"Unlink"}>
              <LinkOffIcon sx={{ cursor: "pointer" }} onClick={initUnlink} />
            </CustomTooltip>
          )}
          {unLinkTimer < LIMIT_TIMER && unLinkTimer > 0 && <Typography>{unLinkTimer}</Typography>}
          {unLinkTimer === 0 && (
            <Box className={styled.actionsUnlink}>
              <CustomTooltip title={"Cancel Unlink"}>
                <Link onClick={() => setUnLinkTimer(LIMIT_TIMER)}>Cancel</Link>
              </CustomTooltip>
              <CustomTooltip title={"Confirm Unlink"}>
                <Link onClick={confirm}>Confirm</Link>
              </CustomTooltip>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default UnlinkTimmer;
