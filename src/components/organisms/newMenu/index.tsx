import { useState } from "react";
import { Box } from "@mui/material";

// sections ---
import Main from "./sections/main";
import EarnPoints from "./sections/earnPoints";
import Rewards from "./sections/rewards";

import styled from "./styled.module.scss";

const Item = ({ children, open, opacity = 1 }: any) => {
  const position = opacity && open ? "relative" : "absolute!important";
  return (
    <Box
      component="section"
      className={styled.item}
      left={open ? "0!important" : "100%"}
      sx={{ opacity, position }}
    >
      {children}
    </Box>
  );
};

const Menu = ({ showBack = false, goToMap, setGame, setCampaing }: any) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [openTokens, setOpenTokens] = useState(false);
  const [openRewards, setOpenRewards] = useState(false);

  const mainOpacity = openPoints || openTokens || openRewards ? 0 : 1;

  return (
    <Box className={styled.menu}>
      <Box className={styled.menuContainer}>
        {/* main view */}
        <Item open={true} opacity={mainOpacity}>
          <Main
            setOpenPoints={setOpenPoints}
            setOpenTokens={setOpenTokens}
            setOpenRewards={setOpenRewards}
          />
        </Item>

        {/* submenu Earn Points */}
        <Item open={openPoints}>
          <EarnPoints setOpenPoints={setOpenPoints} setGame={setGame} setCampaing={setCampaing} />
        </Item>

        {/* submenu ClaimAll*/}
        <Item open={openRewards}>
          <Rewards setOpenClaimAll={setOpenRewards} />
        </Item>
      </Box>
    </Box>
  );
};
export default Menu;
