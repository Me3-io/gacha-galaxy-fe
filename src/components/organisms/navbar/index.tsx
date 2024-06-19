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

import styled from "./styled.module.scss";

import { useDispatch } from "react-redux";
import { fetchChallengeRequest } from "../../../redux/thunks/messageAuth";

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
  const { isConnected, address, status } = useAccount();
  const account = useAccount();
  const { data: signMessageData, signMessage } = useSignMessage();

  useEffect(() => {
    if (status === "connected" && address && !signMessageData && !tokenLS) {
      const from = window.location.hostname;
      dispatch(fetchChallengeRequest({ address, from }) as any).then(async (response: any) => {
        signMessage({ message: response?.message });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, status, signMessageData, tokenLS]);

  useEffect(() => {
    console.log("connector type: ", account?.connector?.type);
  }, [account]);


  return (
    <Box className={styled.navbar}>
      <LanguageIcon onClick={!openLng ? handleOpen : handleClose} className={styled.lngIcon} />
      <LanguageMenu anchorEl={anchorEl} open={openLng} handleClose={handleClose} />

      {isConnected ? (
        <Box className={styled.loggedBox}>
          <span>{`${address?.slice(0, 8)}...${address?.slice(-8)}`}</span>

          <CustomTooltip title="Copy address">
            <ContentCopyIcon onClick={() => navigator.clipboard.writeText(address || "")} />
          </CustomTooltip>

          <CustomTooltip title="Wallet info">
            <WalletIcon onClick={() => open()} />
          </CustomTooltip>

          <Box className={styled.divider} />

          <CustomTooltip title="Disconnect">
            <LogoutIcon onClick={() => disconnect()} />
          </CustomTooltip>
        </Box>
      ) : (
        <Button onClick={() => open()}>LOGIN TO PLAY</Button>
      )}
    </Box>
  );
};
export default Navbar;
