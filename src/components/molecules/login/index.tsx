import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import {
  useDisconnect,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useActiveAccount,
} from "thirdweb/react";
import { chain } from "config/thirdwebConfig";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallengeRequest, selectMessageAuth } from "reduxConfig/thunks/messageAuth";
import { fetchChallengeVerify } from "reduxConfig/thunks/tokenAuth";
import { clearAuthToken } from "reduxConfig/slices/tokenAuth";
import { clearMessageAuth } from "reduxConfig/slices/messageAuth";

import CustomTooltip from "components/atoms/materialTooltip";
import useAlert from "hooks/alertProvider/useAlert";

import LogoutIcon from "@mui/icons-material/Logout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const LoginBar = () => {
  const tokenLS = localStorage.getItem("session.token");
  const accountLS = JSON.parse(localStorage.getItem("session.account") || "{}");
  const { setAlert } = useAlert();

  const [loadSigning, setLoadSigning] = useState(false);
  const [signMessage, setSignedMessage] = useState("");

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const account = useActiveAccount() || accountLS;
  const status = useActiveWalletConnectionStatus();

  const dataMessageAuth = useSelector(selectMessageAuth);

  const logout = () => {
    if (wallet) disconnect(wallet);

    setSignedMessage("");
    setLoadSigning(false);
    dispatch(clearAuthToken());
    dispatch(clearMessageAuth());
    localStorage.removeItem("session.token");
    localStorage.removeItem("session.account");

    navigate(`/${i18n.language}/`);
  };

  const signedMessage = async (message: any) => {
    try {
      const response = await account?.signMessage({ message });
      setSignedMessage(response);
    } catch (error) {
      logout();
      setAlert(t("login-error-rejected"), "error");
    }
  };

  /*const checkSession = () => {
    customAxios()
      .get("/user/validatesession")
      .catch((error: any) => {
        console.error("session error ", error);
        logout();
      });
  };*/

  useEffect(() => {
    const address = account?.address;
    const chainid = chain?.id || 1;
    if (status === "connected" && address && !signMessage && !tokenLS) {
      const from = window.location.hostname;
      setLoadSigning(true);
      dispatch(fetchChallengeRequest({ address, from, chainid }) as any).then(
        async (response: any) => {
          if (response?.message) {
            signedMessage(response.message);
          } else {
            setAlert(t("login-error-request"), "error");
            console.error("Error to challenge request: ", response);
            logout();
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, status]);

  useEffect(() => {
    if (signMessage && dataMessageAuth?.message) {
      const signParams = { signature: signMessage, message: dataMessageAuth.message };
      dispatch(fetchChallengeVerify(signParams) as any).then(async (response: any) => {
        setLoadSigning(false);
        if (response?.sessionToken) {
          localStorage.setItem("session.token", response?.sessionToken);
          localStorage.setItem("session.account", JSON.stringify({ ...account, ...signParams }));
          setSignedMessage("");
          navigate(`/${i18n.language}/home/`);
        } else {
          setAlert(t("login-error-verify"), "error");
          console.error("Error to challenge verify: ", response);
          logout();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signMessage, dataMessageAuth?.message]);

  useEffect(() => {
    const isLoginView = !location.pathname.split("/")[2];
    if (isLoginView && account && tokenLS) {
      navigate(`/${i18n.language}/home/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenLS, account, status]);

  useEffect(() => {
    window.addEventListener("logout", () => logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {account?.address && (
        <Box className={styled.loggedBox}>
          {loadSigning ? (
            <>
              <CircularProgress className={styled.spinner} size={20} />
              <span>{t("login-signing")}</span>
            </>
          ) : (
            <>
              <span>{`${account?.address?.slice(0, 8)}...${account?.address?.slice(-8)}`}</span>

              <CustomTooltip title={t("copy-address")}>
                <ContentCopyIcon
                  onClick={() => navigator.clipboard.writeText(account?.address || "")}
                />
              </CustomTooltip>
            </>
          )}

          <Box className={styled.divider} />

          <CustomTooltip title={t("disconect")}>
            <LogoutIcon onClick={logout} />
          </CustomTooltip>
        </Box>
      )}
    </>
  );
};
export default LoginBar;
