import { Box } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyIcon from "@mui/icons-material/Key";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import CustomTooltip from "components/atoms/materialTooltip";

import useAlert from "hooks/alertProvider/useAlert";
import { useTranslation } from "react-i18next";

import styled from "../styled.module.scss";
import UnlinkTimmer from "./unlinkTimer";
import { useState } from "react";
import ActiveWallet from "./activeWallet";

const ListWallets = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const data = useSelector(getLeaderboard);

  const wallets = data?.wallets.filter((w: any) => !w?.social && w.type !== "me3-created") || [];

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
      {wallets.length > 0 ? (
        wallets.map((row: any) => (
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
              {row.active === true ? <span className={styled.infoLabel}>Active</span> : null}
            </Box>
          </Box>
        ))
      ) : (
        <Box px={3}>
          <span>no connected wallets</span>
        </Box>
      )}
    </>
  );
};

export default ListWallets;
