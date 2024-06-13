import { useState } from "react";
import { Box } from "@mui/material";

import Button from "components/atoms/buttons/default";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageMenu from "components/molecules/languaje";

import { useWeb3Modal } from "@web3modal/wagmi/react";
//import { useAccount, useDisconnect } from "wagmi";

import styled from "./styled.module.scss";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openLng = Boolean(anchorEl);

  const { open } = useWeb3Modal();
  //const { disconnect } = useDisconnect();



  return (
    <Box className={styled.navbar}>
      <LanguageIcon onClick={!openLng ? handleOpen : handleClose} className={styled.lngIcon} />
      <LanguageMenu anchorEl={anchorEl} open={openLng} handleClose={handleClose} />
      
      <Button onClick={() => open()}>LOGIN TO PLAY</Button>
    </Box>
  );
};
export default Navbar;
