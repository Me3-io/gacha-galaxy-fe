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
import LinkOffIcon from "@mui/icons-material/LinkOff";
import GoogleIcon from "@mui/icons-material/Google";
import TelegramIcon from "@mui/icons-material/Telegram";

import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import Button from "components/atoms/buttons/base";

import CustomTooltip from "components/atoms/materialTooltip";
import { useTranslation } from "react-i18next";
import { useActiveWallet, useConnectModal, useSetActiveWallet } from "thirdweb/react";
import useAlert from "hooks/alertProvider/useAlert";

import { onlySocialConfig, onlyWalletConfig } from "config/thirdwebConfig";
import styled from "./styled.module.scss";

const ListWallets = ({ unlinkWallet, activeWallet }: any) => {
  const leaderboardData = useSelector(getLeaderboard);
  const wallets = leaderboardData?.wallets.filter((wallet: any) => !wallet?.social) || [];
  const { setAlert } = useAlert();
  const { t } = useTranslation();

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address || "");
    setAlert("Copy address to clipboard", "success");
  };

  return (
    <>
      {wallets.map((row: any) => (
        <Box
          key={row.address}
          className={`${styled.rowWallet} ${row?.active ? styled.active : ""}`}
        >
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
                <KeyIcon sx={{ cursor: "pointer" }} onClick={() => {}} />
              </CustomTooltip>
            )}

            {!row?.active ? (
              <>
                <CustomTooltip title={"Set Active Wallet"}>
                  <CheckIcon sx={{ cursor: "pointer" }} onClick={() => activeWallet(row.address)} />
                </CustomTooltip>
                <CustomTooltip title={"Unlink Wallet"}>
                  <LinkOffIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => unlinkWallet(row.address)}
                  />
                </CustomTooltip>
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

const ListSocials = ({ unlinkWallet }: any) => {
  const leaderboardData = useSelector(getLeaderboard);
  const wallets =
    leaderboardData?.wallets.filter(
      (wallet: any) => wallet?.social && wallet?.type !== "me3-wallet"
    ) || [];

  return (
    <>
      {wallets.length > 0 ? (
        wallets.map((row: any) => (
          <Box key={row.address} className={styled.rowWallet}>
            <Box>
              {row?.social === "google" && <GoogleIcon />}
              {row?.social === "telegram" && <TelegramIcon />}
              <span>{(row?.social || "social").toUpperCase()}</span>
            </Box>
            <Box>
              <CustomTooltip title={"Unlink Social"}>
                <LinkOffIcon sx={{ cursor: "pointer" }} onClick={() => unlinkWallet(row.address)} />
              </CustomTooltip>
            </Box>
          </Box>
        ))
      ) : (
        <Box px={2}>
          <span>no social linked</span>
        </Box>
      )}
    </>
  );
};

const Profile = ({ setOpen }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { connect } = useConnectModal();
  const { setAlert } = useAlert();

  const [onEditNickname, setOnEditNickname] = useState(false);
  const [onEditEmail, setOnEditEmail] = useState(false);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const wallet = useActiveWallet();
  const setActiveAccount = useSetActiveWallet();
  const leaderboardData = useSelector(getLeaderboard);

  // nickname ---
  const handleChangeNickname = (e: any) => setNickname(e.target.value);
  const handleEditNickname = () => setOnEditNickname(true);

  const handleCancelNickname = () => {
    setNickname(leaderboardData?.userNickname);
    setOnEditNickname(false);
  };

  const handleSaveNickname = async () => {
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
    setOnEditNickname(false);
  };

  // email ---
  const handleChangeEmail = (e: any) => setEmail(e.target.value);
  const handleEditEmail = () => setOnEditEmail(true);

  const handleCancelEmail = () => {
    setEmail(leaderboardData?.userEmail);
    setOnEditEmail(false);
  };

  const handleSaveEmail = async () => {
    if (!email) {
      setAlert("Email is required", "error");
      return;
    }

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setAlert("The email format is not valid", "error");
      return;
    }

    await customAxios()
      .post("/user/updateprofile", { email })
      .then(() => setAlert("Updated successfully", "success"))
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });

    dispatch(fetchLeaderboard() as any);
    setOnEditNickname(false);
  };

  // wallets and social ---
  const addWallet = async () => {
    const activeAccount = wallet;
    try {
      const response = await connect({ ...onlyWalletConfig, size: "compact", title: "Add Wallet" });
      const account = response?.getAccount();

      if (account?.address) await linkWallet(account.address);
      if (activeAccount) setActiveAccount(activeAccount);
    } catch (error: any) {
      console.error(error);
    }
  };

  const addSocial = async () => {
    const activeAccount = wallet;

    try {
      const response = await connect({
        ...onlySocialConfig,
        size: "compact",
        title: "Link Social",
      });
      const account = response?.getAccount();
      // @ts-ignore
      const profiles = await response?.getProfiles();

      if (account?.address) await linkWallet(account.address, profiles[0].type);
      if (activeAccount) setActiveAccount(activeAccount);
    } catch (error: any) {
      console.error(error);
    }
  };

  const linkWallet = async (address: string, social = "") => {
    await customAxios()
      .post("/wallet/link", { address, social })
      .then(() => {
        dispatch(fetchLeaderboard() as any);
        setAlert("Linked successfully", "success");
      })
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  const unlinkWallet = async (address: string) => {
    await customAxios()
      .post("/wallet/unlink", { address })
      .then(() => {
        dispatch(fetchLeaderboard() as any);
        setAlert("Unlink successfully", "success");
      })
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  const activeWallet = async (address: string) => {
    await customAxios()
      .post("/wallet/active", { address })
      .then(() => {
        dispatch(fetchLeaderboard() as any);
        setAlert("Activated successfully", "success");
      })
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  useEffect(() => {
    setNickname(leaderboardData?.userNickname || "");
    setEmail(leaderboardData?.userEmail || "");
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
        {/* Nickname */}
        <TextField
          type="text"
          size="medium"
          variant="outlined"
          className={styled.textField}
          sx={
            onEditNickname
              ? { border: "1px solid #ba00fb!important" }
              : { borderBottom: "1px dashed #ba00fbaa!important" }
          }
          disabled={!onEditNickname}
          value={nickname}
          placeholder="nickname"
          onChange={handleChangeNickname}
          autoComplete="off"
          inputProps={{ maxLength: 25 }}
          InputProps={{
            endAdornment: (
              <>
                {!onEditNickname ? (
                  <IconButton edge="end" color="secondary" onClick={handleEditNickname}>
                    <CreateIcon />
                  </IconButton>
                ) : (
                  <Box display={"flex"} gap={1}>
                    <IconButton edge="end" color="secondary" onClick={handleCancelNickname}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={handleSaveNickname}>
                      <CheckIcon />
                    </IconButton>
                  </Box>
                )}
              </>
            ),
          }}
        />

        {/* Email */}
        <TextField
          type="text"
          size="medium"
          variant="outlined"
          className={styled.textField}
          sx={
            onEditEmail
              ? { border: "1px solid #ba00fb!important" }
              : { borderBottom: "1px dashed #ba00fbaa!important" }
          }
          disabled={!onEditEmail}
          value={email}
          placeholder="email"
          onChange={handleChangeEmail}
          autoComplete="off"
          inputProps={{ maxLength: 25 }}
          InputProps={{
            endAdornment: (
              <>
                {!onEditEmail ? (
                  <IconButton edge="end" color="secondary" onClick={handleEditEmail}>
                    <CreateIcon />
                  </IconButton>
                ) : (
                  <Box display={"flex"} gap={1}>
                    <IconButton edge="end" color="secondary" onClick={handleCancelEmail}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={handleSaveEmail}>
                      <CheckIcon />
                    </IconButton>
                  </Box>
                )}
              </>
            ),
          }}
        />

        <Box className={styled.walletContainer}>
          <Typography pb={1}>Connected Wallets</Typography>
          <ListWallets unlinkWallet={unlinkWallet} activeWallet={activeWallet} />
        </Box>

        <Box className={styled.actions}>
          <Button onClick={addWallet}>
            <WalletIcon /> Add Wallet
          </Button>
        </Box>

        <Box className={styled.socialContainer}>
          <Typography pb={1}>Social Linked</Typography>
          <ListSocials unlinkWallet={unlinkWallet} />
        </Box>

        <Box className={styled.actions}>
          <Button onClick={addSocial}>
            <PersonIcon /> Add Social
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Profile;
