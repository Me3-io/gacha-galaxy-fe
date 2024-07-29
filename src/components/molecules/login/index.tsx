import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
//import { useWeb3Modal } from "@web3modal/wagmi/react";
//import { useAccount, useDisconnect, useSignMessage } from "wagmi";
//import { bsc, sepolia } from "wagmi/chains";

import {
  useConnect,
  useDisconnect,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useActiveAccount
} from "thirdweb/react";


import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallengeRequest, selectMessageAuth } from "reduxConfig/thunks/messageAuth";
import { fetchChallengeVerify } from "reduxConfig/thunks/tokenAuth";
import { clearAuthToken } from "reduxConfig/slices/tokenAuth";
import { clearMessageAuth } from "reduxConfig/slices/messageAuth";

import CustomTooltip from "components/atoms/materialTooltip";
import Button from "components/atoms/buttons/default";
import Alert from "../alert";

import LogoutIcon from "@mui/icons-material/Logout";
import WalletIcon from "@mui/icons-material/Wallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

//const chains = [process.env.REACT_APP_CHAIN === "bsc" ? bsc : sepolia] as const;

const LoginBar = ({ showLoginButton = false }: any) => {
  const [loadSigning, setLoadSigning] = useState(false);
  //const [loadLogout, setLoadLogout] = useState(false);
  const [onError, setOnError] = useState({ show: false, msg: "" });
  const [signMessage, setSignedMessage] = useState("");

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const status = useActiveWalletConnectionStatus();


  /*const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const { isConnected, isConnecting, isDisconnected, address, status } = useAccount();
  const { data: dataMsg, error: errorMsg, reset: resetMsg, signMessage } = useSignMessage();*/

  const tokenLS = localStorage.getItem("sessionToken");
  const dataMessageAuth = useSelector(selectMessageAuth);

  const logout = () => {
    //setLoadLogout(true);
    if (wallet) disconnect(wallet);
    
    dispatch(clearAuthToken());
    dispatch(clearMessageAuth());
    localStorage.removeItem("sessionToken");

    navigate(`/${i18n.language}/`);
  };

  useEffect(() => {
    //const sameChain = account.chainId === chains[0].id;
    if (status === "connected" && account?.address && !signMessage && !tokenLS) {
      console.log("signing...");
      const from = window.location.hostname;
      const address = account?.address;
      setLoadSigning(true);
      dispatch(fetchChallengeRequest({ address, from }) as any).then(async (response: any) => {
        if (response?.message) {
          const message = await account.signMessage({ message: response?.message });
          setSignedMessage(message);
        } else {
          setOnError({ show: true, msg: "Error to challenge request" });
          console.error("Error to challenge request: ", response);
          logout();
        }
      });
    }

    //console.log("account", account);

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
    
  /*useEffect(() => {
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
  }, [dataMsg, dataMessageAuth?.message]);*/

  //useEffect(() => {
   
    /*const msg = errorMsg?.toString();
    if (msg?.includes("UnknownRpcError")) {
      setOnError({ show: true, msg: "Unknown Rpc Error" });
      logout();
    }
    if (msg?.includes("UserRejectedRequestError")) {
      setOnError({ show: true, msg: "User Rejected Request" });
      logout();
    }*/

    // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [error]);

  useEffect(() => {
    const isLoginView = !location.pathname.split("/")[2];
    if (isLoginView && account && tokenLS && status === "connected") {
      navigate(`/${i18n.language}/home/`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenLS, account, status]);

;

  /*useEffect(() => {
    if (isDisconnected) {
      setLoadLogout(false);

      resetMsg();
      dispatch(clearAuthToken());
      dispatch(clearMessageAuth());
      localStorage.removeItem("sessionToken");

      navigate(`/${i18n.language}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected]);*/

  /*useEffect(() => {
    console.log(status);
    if (status === "connected" && loadLogout) {
      disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, loadLogout]);
*/
  return (
    <>
      {account?.address && status === "connected" ? (
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

              <CustomTooltip title="Wallet info">
                <WalletIcon onClick={() => {} /*open()*/} />
              </CustomTooltip>
            </>
          )}
          <Box className={styled.divider} />

          <CustomTooltip title="Disconnect">
            {/*!loadLogout ? (*/
              <LogoutIcon onClick={logout} />
            /*) : (
              <CircularProgress className={styled.spinner} size={20} />
            )*/}
          </CustomTooltip>
        </Box>
      ) : (
        <>{showLoginButton && <Button>LOGIN TO PLAY</Button>}</>
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
