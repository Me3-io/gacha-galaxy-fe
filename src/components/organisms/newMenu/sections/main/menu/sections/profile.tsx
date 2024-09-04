import { useEffect, useState } from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WalletIcon from "@mui/icons-material/Wallet";

import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import Button from "components/atoms/buttons/base";
import CustomTooltip from "components/atoms/materialTooltip";

import { useActiveWallet, useWalletDetailsModal } from "thirdweb/react";
import { modalConfig } from "config/thirdwebConfig";
import { useTranslation } from "react-i18next";
import useAlert from "hooks/alertProvider/useAlert";

import styled from "../styled.module.scss";

const Profile = ({ setOpen }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const detailsModal = useWalletDetailsModal();
  const wallet = useActiveWallet();

  const leaderboardData = useSelector(getLeaderboard);
  const accountLS = JSON.parse(localStorage.getItem("session.account") || "{}");

  const [onEdit, setOnEdit] = useState(false);
  const [nickname, setNickname] = useState("");

  const { setAlert } = useAlert();
  const handleChange = (e: any) => setNickname(e.target.value);
  const handleEdit = () => setOnEdit(true);

  const handleCancel = () => {
    setNickname(leaderboardData?.userNickname);
    setOnEdit(false);
  };

  const handleSave = async () => {
    if (!nickname) {
      setAlert("Nickname is required", "error");
      return;
    }

    const regex = /^[^\s]{1,25}$/;
    if (!regex.test(nickname)) {
      setAlert("Nickname must be 1-25 characters long and contain no spaces", "error");
      return;
    }

    await customAxios()
      .post("/user/updateprofile", { nickname })
      .then(() => setAlert("Updated successfully", "success"))
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });

    dispatch(fetchLeaderboard() as any);
    setOnEdit(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(accountLS?.address || "");
    setAlert("Copy address to clipboard", "success");
  };

  const handleDetails = () => {
    if (wallet) detailsModal.open({ ...modalConfig });
  };

  useEffect(() => {
    setNickname(leaderboardData?.userNickname || "");
  }, [leaderboardData]);

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box className={styled.header}>
        <Button onClick={() => setOpen(false)}>
          <ArrowBackIcon /> {t("back")}
        </Button>
        <Typography pb={2} className={styled.title}>
          {t("menu-profile").toUpperCase()}
        </Typography>
      </Box>
      <Box p={2} px={3} className={styled.container}>
        <Box className={styled.profileContainer}>
          <TextField
            type="text"
            size="medium"
            variant="outlined"
            className={styled.textField}
            sx={
              onEdit
                ? { border: "1px solid #ba00fb!important" }
                : { borderBottom: "1px dashed #ba00fbaa!important" }
            }
            disabled={!onEdit}
            value={nickname}
            onChange={handleChange}
            autoComplete="off"
            inputProps={{ maxLength: 25 }}
            InputProps={{
              endAdornment: (
                <>
                  {!onEdit ? (
                    <IconButton edge="end" color="secondary" onClick={handleEdit}>
                      <CreateIcon />
                    </IconButton>
                  ) : (
                    <Box display={"flex"} gap={1}>
                      <IconButton edge="end" color="secondary" onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                      <IconButton edge="end" color="secondary" onClick={handleSave}>
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  )}
                </>
              ),
            }}
          />

          <Box className={styled.wallet}>
            <Typography>Connected Wallets</Typography>
            <Box display={"flex"} gap={2} alignItems={"center"} p={3}>
              <span>
                {`${accountLS?.address?.slice(0, 15)}...${accountLS?.address?.slice(-15)}`}
              </span>

              <CustomTooltip title={t("copy-address")}>
                <ContentCopyIcon sx={{ cursor: "pointer" }} onClick={handleCopy} />
              </CustomTooltip>
              <CustomTooltip title={"Wallet Info"}>
                <WalletIcon sx={{ cursor: "pointer" }} onClick={handleDetails} />
              </CustomTooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Profile;
