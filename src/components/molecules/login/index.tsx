import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import {
  useDisconnect,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useActiveAccount,
} from "thirdweb/react";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallengeRequest, selectMessageAuth } from "reduxConfig/thunks/messageAuth";
import { fetchChallengeVerify } from "reduxConfig/thunks/tokenAuth";
import { clearAuthToken } from "reduxConfig/slices/tokenAuth";
import { clearMessageAuth } from "reduxConfig/slices/messageAuth";

import CustomTooltip from "components/atoms/materialTooltip";
import Alert from "../alert";

import LogoutIcon from "@mui/icons-material/Logout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const LoginBar = () => {
  const tokenLS = localStorage.getItem("sessionToken");
  const accountLS = JSON.parse(localStorage.getItem("thirdweb.account") || "{}");

  const [loadSigning, setLoadSigning] = useState(false);

  const [signMessage, setSignedMessage] = useState("");
  const [onError, setOnError] = useState({ show: false, msg: "" });

  const { i18n } = useTranslation();
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
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("thirdweb.account");

    navigate(`/${i18n.language}/`);
  };

  const signedMessage = async (message: any) => {
    try {
      const response = await account?.signMessage({ message });
      setSignedMessage(response);
    } catch (error) {
      logout();
      setOnError({ show: true, msg: "User Rejected Request" });
    }
  };

  const checkSession = () => {
    console.log("aqui chequear session");
  };

  useEffect(() => {
    const address = account?.address;
    if (status === "connected" && address && !signMessage && !tokenLS) {
      const from = window.location.hostname;
      setLoadSigning(true);
      dispatch(fetchChallengeRequest({ address, from }) as any).then(async (response: any) => {
        if (response?.message) {
          signedMessage(response.message);
        } else {
          setOnError({ show: true, msg: "Error to challenge request" });
          console.error("Error to challenge request: ", response);
          logout();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, status]);

  useEffect(() => {
    if (signMessage && dataMessageAuth?.message) {
      dispatch(
        fetchChallengeVerify({ signature: signMessage, message: dataMessageAuth.message }) as any
      ).then(async (response: any) => {
        setLoadSigning(false);
        if (response?.sessionToken) {
          localStorage.setItem("sessionToken", response?.sessionToken);
          localStorage.setItem("thirdweb.account", JSON.stringify(account));
          setSignedMessage("");
          navigate(`/${i18n.language}/home/`);
        } else {
          setOnError({ show: true, msg: "Error to challenge verify" });
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

    if (account && tokenLS && status !== "connected") {
      checkSession();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenLS, account, status]);

  return (
    <>
      {account?.address && (
        <Box className={styled.loggedBox}>
          {loadSigning ? (
            <>
              <CircularProgress className={styled.spinner} size={20} />
              <span>Signing...</span>
            </>
          ) : (
            <>
              <span>{`${account?.address?.slice(0, 8)}...${account?.address?.slice(-8)}`}</span>

              <CustomTooltip title="Copy address">
                <ContentCopyIcon
                  onClick={() => navigator.clipboard.writeText(account?.address || "")}
                />
              </CustomTooltip>
            </>
          )}
          <Box className={styled.divider} />

          <CustomTooltip title="Disconnect">
            <LogoutIcon onClick={logout} />
          </CustomTooltip>
        </Box>
      )}

      {onError.show && (
        <Alert onClose={() => setOnError({ show: false, msg: "" })}>
          {onError.msg || "Error to login."}
        </Alert>
      )}
    </>
  );
};
export default LoginBar;
