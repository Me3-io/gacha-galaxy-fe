import { useEffect, useState } from "react";
import { Box, FormControlLabel, Grid, IconButton, Switch, TextField, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";

import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import customAxios from "utils/customAxios";
import Button from "components/atoms/buttons/base";

import { useTranslation } from "react-i18next";
import { useActiveWallet, useConnectModal, useSetActiveWallet } from "thirdweb/react";
import useAlert from "hooks/alertProvider/useAlert";

import { appMetadata, chain, client, onlyWalletConfig, theme } from "config/thirdwebConfig";
import { inAppWallet } from "thirdweb/wallets";

import ListWallets from "./components/listWallets";
import ListSocials from "./components/listSocial";

import styled from "./styled.module.scss";

const Profile = ({ setOpen }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { connect } = useConnectModal();
  const { setAlert } = useAlert();

  const [onEditNickname, setOnEditNickname] = useState(false);
  const [onEditEmail, setOnEditEmail] = useState(false);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ nickname: "", email: "" });

  const wallet = useActiveWallet();
  const setActiveAccount = useSetActiveWallet();
  const leaderboard = useSelector(getLeaderboard);

  const activeSocials = leaderboard?.wallets.map((w: any) => w?.social);
  const socials = ["google", "telegram"].filter((s) => !activeSocials.includes(s)) as ("google" | "telegram")[];

  const walletActive = leaderboard?.wallets.find((w: any) => w?.active && !w.social) || {};
  const cryptoUser = walletActive?.type !== "me3-created" ? true : false;

  const [isCryptoUser, setIsCryptoUser] = useState(cryptoUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCryptoUser(event.target.checked);
  };

  // nickname ---
  const handleChangeNickname = (e: any) => setNickname(e.target.value);

  const handleEditNickname = () => setOnEditNickname(true);

  const handleCancelNickname = () => {
    setNickname(leaderboard?.userNickname);
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

    setForm((prev) => ({ ...prev, nickname }));

    setOnEditNickname(false);
  };

  // email ---
  const handleChangeEmail = (e: any) => setEmail(e.target.value);

  const handleEditEmail = () => setOnEditEmail(true);

  const handleCancelEmail = () => {
    setEmail(leaderboard?.userEmail);
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

    setForm((prev) => ({ ...prev, email }));

    setOnEditEmail(false);
  };

  const updateprofile = async () => {
    await customAxios()
      .post("/user/updateprofile", { ...form })
      .then(() => setAlert("Updated successfully", "success"))
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });

    dispatch(fetchLeaderboard() as any);
  };

  useEffect(() => {
    setNickname(leaderboard?.userNickname || "");
    setEmail(leaderboard?.userEmail || "");
    setForm({ nickname: leaderboard?.userNickname || "", email: leaderboard?.userEmail || "" });
  }, [leaderboard]);

  useEffect(() => {
    if (
      (form.nickname || form.email) &&
      (form.nickname !== leaderboard?.userNickname || form.email !== leaderboard?.userEmail)
    ) {
      updateprofile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  // wallets and social ---

  const setActiveWallet = async (address: any) => {
    await customAxios()
      .post("/wallet/active", { address })
      .then(async () => {
        await dispatch(fetchLeaderboard() as any);
        setAlert("Activated successfully", "success");
      })
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  const addWallet = async () => {
    const activeAccount = wallet;
    try {
      const response = await connect({ ...onlyWalletConfig, size: "compact", title: "Add Wallet" });
      const account = response?.getAccount();

      if (account?.address) await linkWallet(account.address);
      if (activeAccount) setActiveAccount(activeAccount);
      setActiveWallet(account?.address);
    } catch (error: any) {
      console.error(error);
    }
  };

  const addSocial = async () => {
    const activeAccount = wallet;

    const wallets = [inAppWallet({ auth: { options: socials } })];

    try {
      const response = await connect({
        client,
        wallets,
        appMetadata,
        theme,
        chain,
        size: "compact",
        title: "Link Social",
        showThirdwebBranding: false,
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
      <Box p={2} className={styled.container}>
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
            onEditEmail ? { border: "1px solid #ba00fb!important" } : { borderBottom: "1px dashed #ba00fbaa!important" }
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

        <FormControlLabel
          control={<Switch checked={isCryptoUser} onChange={handleChange} name="cryptouser" color="secondary" />}
          label="Enable Crypto Functions"
          labelPlacement="start"
          className={styled.switch}
          disabled={cryptoUser}
        />

        {isCryptoUser && (
          <>
            <Box className={styled.walletContainer} pb={2}>
              <Typography pb={1}>Connected Wallets</Typography>
              <ListWallets />
            </Box>

            <Box className={styled.actions}>
              <Button onClick={addWallet}>
                <WalletIcon /> Add Wallet
              </Button>
            </Box>
          </>
        )}

        <Box className={styled.socialContainer} pb={2}>
          <Typography pb={1}>Link Social</Typography>
          <ListSocials />
        </Box>

        <Box className={styled.actions}>
          <Button onClick={addSocial} disabled={socials.length === 0}>
            <PersonIcon /> Add Social
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Profile;
