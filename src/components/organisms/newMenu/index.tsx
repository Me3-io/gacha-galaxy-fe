import { useState } from "react";
import { Box } from "@mui/material";

// sections ---
import Main from "./sections/main";
import EarnPoints from "./sections/earnPoints";
import Rewards from "./sections/rewards";

import styled from "./styled.module.scss";

const SectionItem = ({ children, open, opacity = 1 }: any) => {
  const position = opacity && open ? "relative" : "absolute!important";
  return (
    <Box
      component="section"
      className={styled.sectionItem}
      left={open ? "0!important" : "100%"}
      sx={{ opacity, position }}
    >
      {children}
    </Box>
  );
};

const MainPanel = ({ showBack = false, goToMap, setGame, setCampaing }: any) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [openTokens, setOpenTokens] = useState(false);
  const [openRewards, setOpenRewards] = useState(false);

  const mainOpacity = openPoints || openTokens || openRewards ? 0 : 1;

  return (
    <Box className={styled.menu}>
      <Box className={styled.menuContainer}>
        {/* main view */}
        <SectionItem open={true} opacity={mainOpacity}>
          <Main
            setOpenPoints={setOpenPoints}
            setOpenTokens={setOpenTokens}
            setOpenRewards={setOpenRewards}
          />
        </SectionItem>

        {/* submenu Earn Points */}
        <SectionItem open={openPoints}>
          <EarnPoints setOpenPoints={setOpenPoints} setGame={setGame} setCampaing={setCampaing} />
        </SectionItem>

        {/* submenu ClaimAll*/}
        <SectionItem open={openRewards}>
          <Rewards setOpenClaimAll={setOpenRewards} />
        </SectionItem>
      </Box>
    </Box>
  );
};
export default MainPanel;
