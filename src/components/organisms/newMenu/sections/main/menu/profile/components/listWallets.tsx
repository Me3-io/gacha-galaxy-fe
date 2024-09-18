import { Box, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyIcon from "@mui/icons-material/Key";

import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import CustomTooltip from "components/atoms/materialTooltip";

import useAlert from "hooks/alertProvider/useAlert";
import { useTranslation } from "react-i18next";

import styled from "../styled.module.scss";
import UnlinkTimmer from "./unlinkTimer";
import { useState } from "react";

const ActiveWallet = ({ address, actionDisabled, setActionDisabled }: any) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const dispatch = useDispatch();

  const setActiveWallet = async (address: string) => {
    setLoading(true);
    setActionDisabled(true);
    await customAxios()
      .post("/wallet/active", { address })
      .then(async () => {
        await dispatch(fetchLeaderboard() as any);
        setAlert("Activated successfully", "success");
        setLoading(false);
        setActionDisabled(false);
      })
      .catch((error: any) => {
        setLoading(false);
        setActionDisabled(false);
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
            sx={{ cursor: "pointer", pointerEvents: actionDisabled ? "none" : "auto" }}
            onClick={() => setActiveWallet(address)}
          />
        </CustomTooltip>
      )}
    </>
  );
};

const ListWallets = () => {
  const [actionDisabled, setActionDisabled] = useState(false);
  const data = useSelector(getLeaderboard);

  const wallets = data?.wallets.filter((w: any) => !w?.social) || [];

  const { setAlert } = useAlert();
  const { t } = useTranslation();

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address || "");
    setAlert("Copy address to clipboard", "success");
  };

  const getPrivateKey = async (address: string) => {
    await customAxios()
      .post("/wallet/key", { address })
      .then((response) => {
        navigator.clipboard.writeText(response?.data?.data || "");
        setAlert("Copy Private Key to clipboard", "success");
      })
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  return (
    <>
      {wallets.map((row: any) => (
        <Box key={row.address} className={`${styled.rowWallet} ${row?.active ? styled.active : ""}`}>
          <Box>
            <span>{`${row.address?.slice(0, 8)}...${row.address?.slice(-8)}`}</span>
            {row?.type === "me3-created" && <span className={styled.infoLabel}>Me3</span>}

            <CustomTooltip title={t("copy-address")}>
              <ContentCopyIcon sx={{ cursor: "pointer" }} onClick={() => handleCopy(row.address)} />
            </CustomTooltip>
          </Box>
          <Box>
            {row?.type === "me3-created" && (
              <CustomTooltip title={"Get Private Key"}>
                <KeyIcon sx={{ cursor: "pointer" }} onClick={() => getPrivateKey(row.address)} />
              </CustomTooltip>
            )}

            {!row?.active ? (
              <>
                <ActiveWallet
                  address={row.address}
                  actionDisabled={actionDisabled}
                  setActionDisabled={setActionDisabled}
                />
                <UnlinkTimmer address={row.address} />
              </>
            ) : (
              <span className={styled.infoLabel}>Active</span>
            )}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ListWallets;
