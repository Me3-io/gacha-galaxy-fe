import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

import CustomTooltip from "components/atoms/materialTooltip";
import Button from "components/atoms/buttons/default";
import LanguageMenu from "components/molecules/languaje";

import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import WalletIcon from "@mui/icons-material/Wallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "assets/logo.svg";

import styled from "./styled.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallengeRequest, selectMessageAuth } from "reduxConfig/thunks/messageAuth";
import { fetchChallengeVerify } from "reduxConfig/thunks/tokenAuth";
import { clearAuthToken } from "reduxConfig/slices/tokenAuth";
import { clearMessageAuth } from "reduxConfig/slices/messageAuth";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = ({ showLoginButton = false, hiddenLogo = false }: any) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // languaje menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openLng = Boolean(anchorEl);

  // login
  const dispatch = useDispatch();
  const tokenLS = localStorage.getItem("sessionToken");

  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const { isConnected, isConnecting, address } = useAccount();
  const {
    data: dataMessage,
    error: errorMessage,
    reset: resetMessage,
    signMessage,
  } = useSignMessage();

  const [loadSigning, setLoadSigning] = useState(false);
  const [loadLogout, setLoadLogout] = useState(false);
  const dataMessageAuth = useSelector(selectMessageAuth);

  const logout = () => {
    setLoadLogout(true);
    disconnect();
    resetMessage();
    dispatch(clearAuthToken());
    dispatch(clearMessageAuth());
    setLoadSigning(false);
    localStorage.removeItem("sessionToken");
  };

  useEffect(() => {
    if (isConnected && address && !dataMessage && !tokenLS) {
      /*if (connector?.type === "w3mAuth") {
        localStorage.setItem("sessionToken", connector.uid);
        navigate(`/${i18n.language}/home/`);
      } else {*/
      const from = window.location.hostname;
      setLoadSigning(true);
      dispatch(fetchChallengeRequest({ address, from }) as any).then(async (response: any) => {
        if (response?.message) {
          signMessage({ message: response?.message });
        } else {
          console.error("Error to challenge request: ", response);
          logout();
        }
      });
      // }
    }

    if (!isConnected && !tokenLS && !address && !isConnecting) {
      console.log("pasa aca");
      setLoadLogout(false);
      navigate(`/${i18n.language}/`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  useEffect(() => {
    if (dataMessage && dataMessageAuth?.message) {
      dispatch(
        fetchChallengeVerify({ signature: dataMessage, message: dataMessageAuth.message }) as any
      ).then(async (response: any) => {
        setLoadSigning(false);
        if (response?.sessionToken) {
          localStorage.setItem("sessionToken", response?.sessionToken);
          navigate(`/${i18n.language}/home/`);
        } else {
          console.error("Error to challenge verify: ", response);
          logout();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMessage, dataMessageAuth?.message]);

  useEffect(() => {
    if (errorMessage?.toString().includes("User rejected the request")) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  useEffect(() => {
    console.log("account: ", account);
  }, [account]);

  return (
    <Box component={"header"} className={styled.navbar}>
      <Box className={styled.logo}>
        {!hiddenLogo && <img src={Logo} alt="Logo" className={styled.imgLogo} />}
      </Box>

      <Box display={"flex"} gap={2} alignItems={"center"}>
        <LanguageIcon onClick={!openLng ? handleOpen : handleClose} className={styled.lngIcon} />
        <LanguageMenu anchorEl={anchorEl} open={openLng} handleClose={handleClose} />

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
      </Box>
    </Box>
  );
};
export default Navbar;
