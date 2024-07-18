import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { bsc, sepolia } from "wagmi/chains";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallengeRequest, selectMessageAuth } from "reduxConfig/thunks/messageAuth";
import { fetchChallengeVerify } from "reduxConfig/thunks/tokenAuth";
import { clearAuthToken } from "reduxConfig/slices/tokenAuth";
import { clearMessageAuth } from "reduxConfig/slices/messageAuth";

import CustomTooltip from "components/atoms/materialTooltip";
import Button from "components/atoms/buttons/default";

import LogoutIcon from "@mui/icons-material/Logout";
import WalletIcon from "@mui/icons-material/Wallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const chains = [process.env.REACT_APP_CHAIN === "bsc" ? bsc : sepolia] as const;

const LoginBar = ({ showLoginButton = false }: any) => {
  const [loadSigning, setLoadSigning] = useState(false);
  const [loadLogout, setLoadLogout] = useState(false);
  const [onError, setOnError] = useState({ show: false, msg: "" });

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const { isConnected, isConnecting, isDisconnected, address } = useAccount();
  const { data: dataMsg, error: errorMsg, reset: resetMsg, signMessage } = useSignMessage();

  const tokenLS = localStorage.getItem("sessionToken");
  const dataMessageAuth = useSelector(selectMessageAuth);

  const logout = () => {
    setLoadLogout(true);
    setLoadSigning(false);
    disconnect();
    resetMsg();
    dispatch(clearAuthToken());
    dispatch(clearMessageAuth());
  };

  useEffect(() => {
    const sameChain = account.chainId === chains[0].id;
    if (isConnected && address && !dataMsg && !tokenLS && sameChain) {
      const from = window.location.hostname;
      setLoadSigning(true);
      dispatch(fetchChallengeRequest({ address, from }) as any).then(async (response: any) => {
        if (response?.message) {
          signMessage({ message: response?.message });
        } else {
          setOnError({ show: true, msg: "Error to challenge request" });
          console.error("Error to challenge request: ", response);
          logout();
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, account.chainId]);

  useEffect(() => {
    if (dataMsg && dataMessageAuth?.message) {
      dispatch(
        fetchChallengeVerify({ signature: dataMsg, message: dataMessageAuth.message }) as any
      ).then(async (response: any) => {
        setLoadSigning(false);
        if (response?.sessionToken) {
          localStorage.setItem("sessionToken", response?.sessionToken);
          navigate(`/${i18n.language}/home/`);
        } else {
          setOnError({ show: true, msg: "Error to challenge verify" });
          console.error("Error to challenge verify: ", response);
          logout();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMsg, dataMessageAuth?.message]);

  useEffect(() => {
    const msg = errorMsg?.toString();
    if (msg?.includes("UnknownRpcError")) {
      setOnError({ show: true, msg: "Unknown Rpc Error" });
      logout();
    }
    if (msg?.includes("UserRejectedRequestError")) {
      setOnError({ show: true, msg: "User Rejected Request" });
      logout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg]);

  useEffect(() => {
    const isLoginView = !location.pathname.split("/")[2];
    if (!isLoginView && !tokenLS) {
      navigate(`/${i18n.language}/`);
    }

    if (isLoginView && isConnected && tokenLS) {
      navigate(`/${i18n.language}/home/`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenLS, isConnected]);

  useEffect(() => {
    if (isDisconnected) {
      setLoadLogout(false);
      disconnect();
      resetMsg();
      dispatch(clearAuthToken());
      dispatch(clearMessageAuth());
      localStorage.removeItem("sessionToken");
      const isLoginView = !location.pathname.split("/")[2];
      if (!isLoginView) navigate(`/${i18n.language}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected]);

  /*useEffect(() => {
    console.log("account.chainId", account.chainId);
  }, [account.chainId]);*/

  return (
    <>
      {isConnected && !isConnecting ? (
        <Box className={styled.loggedBox}>
          {loadSigning ? (
            <>
              <CircularProgress className={styled.spinner} size={20} />
              <span>Signing...</span>
            </>
          ) : (
            <>
              <span>{`${address?.slice(0, 8)}...${address?.slice(-8)}`}</span>

              <CustomTooltip title="Copy address">
                <ContentCopyIcon onClick={() => navigator.clipboard.writeText(address || "")} />
              </CustomTooltip>

              <CustomTooltip title="Wallet info">
                <WalletIcon onClick={() => open()} />
              </CustomTooltip>
            </>
          )}
          <Box className={styled.divider} />

          <CustomTooltip title="Disconnect">
            {!loadLogout ? (
              <LogoutIcon onClick={logout} />
            ) : (
              <CircularProgress className={styled.spinner} size={20} />
            )}
          </CustomTooltip>
        </Box>
      ) : (
        <>
          {showLoginButton && (
            <Button onClick={() => open()} isLoading={isConnecting}>
              LOGIN TO PLAY
            </Button>
          )}
        </>
      )}

      {onError.show && (
        <Alert
          severity="error"
          className={styled.alert}
          onClose={() => setOnError({ show: false, msg: "" })}
        >
          {onError.msg || "Error to login."}
        </Alert>
      )}
    </>
  );
};
export default LoginBar;
