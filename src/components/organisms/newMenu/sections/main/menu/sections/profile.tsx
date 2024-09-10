import { useEffect, useState } from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";

import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import Button from "components/atoms/buttons/base";

import CustomTooltip from "components/atoms/materialTooltip";
import { useTranslation } from "react-i18next";
import { useActiveWallet, useConnectModal, useProfiles, useSetActiveWallet } from "thirdweb/react";
import useAlert from "hooks/alertProvider/useAlert";

import { onlySocialConfig, onlyWalletConfig } from "config/thirdwebConfig";
import styled from "../styled.module.scss";

const Profile = ({ setOpen }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { connect } = useConnectModal();

  const wallet = useActiveWallet();
  const setActiveAccount = useSetActiveWallet();
  const { data: profiles } = useProfiles();

  const leaderboardData = useSelector(getLeaderboard);
  const accountLS = JSON.parse(localStorage.getItem("session.account") || "{}");

  const [onEdit, setOnEdit] = useState(false);
  const [nickname, setNickname] = useState("");

  const { setAlert } = useAlert();
  const handleChange = (e: any) => setNickname(e.target.value);
  const handleEdit = () => setOnEdit(true);

  const rowWallets = [
    {
      address: `${accountLS?.address?.slice(0, 8)}...${accountLS?.address?.slice(-8)}`,
      type: "me3-created",
    },
  ];

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

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address || "");
    setAlert("Copy address to clipboard", "success");
  };

  const addWallet = async () => {
    const activeAccount = wallet;
    try {
      const response = await connect({ ...onlyWalletConfig, size: "compact", title: "Add Wallet" });
      const account = response?.getAccount();

      console.log("aca guardar: ", "wallet", account?.address);

      if (activeAccount) setActiveAccount(activeAccount);
    } catch (error) {
      console.error(error);
    }
  };

  const addSocial = async () => {
    const activeAccount = wallet;

    try {
      const response = await connect({ ...onlySocialConfig, size: "compact", title: "Add Social" });
      const account = response?.getAccount();
      // @ts-ignore
      const profiles = await response?.getProfiles();
      console.log("aca guardar: ", profiles[0].type, account?.address);

      if (activeAccount) setActiveAccount(activeAccount);
    } catch (error) {
      console.error(error);
    }
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
            {rowWallets.map((row, index) => (
              <Box key={index} className={styled.rowWallet}>
                <Box>
                  <span>{row.address}</span>
                  {row.type === "me3-created" && <span className={styled.infoLabel}>Me3</span>}
                </Box>
                <Box>
                  {row.type === "me3-created" && (
                    <CustomTooltip title={"Get Private Key"}>
                      <KeyIcon sx={{ cursor: "pointer" }} onClick={() => {}} />
                    </CustomTooltip>
                  )}

                  <CustomTooltip title={t("copy-address")}>
                    <ContentCopyIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleCopy(row.address)}
                    />
                  </CustomTooltip>
                </Box>
              </Box>
            ))}
          </Box>

          <Box className={styled.actions}>
            <Button onClick={addSocial}>
              <PersonIcon /> Link Social
            </Button>

            <Button onClick={addWallet}>
              <WalletIcon /> Add wallet
            </Button>
          </Box>

          <Box p={2}>
            {profiles?.map((profile: any) => (
              <Typography>{profile.type}</Typography>
            ))}
          </Box>

          {/*<Box className={styled.info} mb={2}>
            <InfoIcon />
            <Typography>Add a social link will create a me3 wallet. You can only add one</Typography>
          </Box>*/}
        </Box>
      </Box>
    </Grid>
  );
};
export default Profile;

/*
post("wallet/add", {
  social: true | false
  address : "0x1234567890"
})

post("wallet/unlink", {
  address : "0x1234567890"
})

post("wallet/active", {
  address : "0x1234567890"
})

*/
