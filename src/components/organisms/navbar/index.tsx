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

import styled from "./styled.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallengeRequest, selectMessageAuth } from "reduxConfig/thunks/messageAuth";
import { fetchChallengeVerify } from "reduxConfig/thunks/tokenAuth";
import { clearAuthToken } from "reduxConfig/slices/tokenAuth";
import { clearMessageAuth } from "reduxConfig/slices/messageAuth";

const Navbar = () => {
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
  const { isConnected, isConnecting, address } = useAccount();
  const { data: dataMessage, error: errorMessage, reset: resetMessage, signMessage } = useSignMessage();

  const [loadSign, setLoadSign] = useState(false);
  const dataMessageAuth = useSelector(selectMessageAuth);

  const logout = () => {
    disconnect();
    resetMessage();
    dispatch(clearAuthToken());
    dispatch(clearMessageAuth());
    setLoadSign(false);
    localStorage.removeItem("sessionToken");
  };

  useEffect(() => {
    if (isConnected && address && !dataMessage && !tokenLS) {
      const from = window.location.hostname;
      setLoadSign(true);
      dispatch(fetchChallengeRequest({ address, from }) as any).then(async (response: any) => {
        signMessage({ message: response?.message });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  useEffect(() => {
    if (dataMessage && dataMessageAuth?.message) {
      dispatch(
        fetchChallengeVerify({ signature: dataMessage, message: dataMessageAuth.message }) as any
      ).then(async (response: any) => {
        setLoadSign(false);
        if (response && response?.sessionToken) {
          localStorage.setItem("sessionToken", response?.sessionToken);
        } else {
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

  /* useEffect(() => {
    console.log("account: ", account);
  }, [account]);*/

  return (
    <Box className={styled.navbar}>
      <LanguageIcon onClick={!openLng ? handleOpen : handleClose} className={styled.lngIcon} />
      <LanguageMenu anchorEl={anchorEl} open={openLng} handleClose={handleClose} />

      {isConnected ? (
        <Box className={styled.loggedBox}>
          {loadSign ? (
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
            <LogoutIcon onClick={logout} />
          </CustomTooltip>
        </Box>
      ) : (
        <Button onClick={() => open()} isLoading={isConnecting}>
          LOGIN TO PLAY
        </Button>
      )}
    </Box>
  );
};
export default Navbar;
