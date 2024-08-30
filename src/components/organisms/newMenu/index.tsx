import { useState } from "react";
import { Box } from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// sections ---
import Main from "./sections/main";
import EarnPoints from "./sections/earnPoints";
import Rewards from "./sections/rewards";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";


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

const MainPanel = ({ showBack = false, goToMap, setGame, setCampaing, setOpenTokens }: any) => {
  const { t } = useTranslation();
  const [openPoints, setOpenPoints] = useState(false);

  const [openRewards, setOpenRewards] = useState(false);

  const mainOpacity = openPoints || openRewards ? 0 : 1;

  return (
    <>
      <Box className={styled.menu}>
        <Box className={styled.menuContainer}>
          {showBack && mainOpacity !== 0 && (
            <Box className={styled.showBack} onClick={goToMap}>
              <span>{t("map")}</span>
              <UpIcon />
            </Box>
          )}

          {/* main view */}
          <SectionItem open={true} opacity={mainOpacity}>
            <Main
              setOpenPoints={setOpenPoints}
              setOpenTokens={setOpenTokens}
              setOpenRewards={setOpenRewards}
            />
          </SectionItem>

          {/* subsection Earn Points */}
          <SectionItem open={openPoints}>
            <EarnPoints setOpen={setOpenPoints} setGame={setGame} setCampaing={setCampaing} />
          </SectionItem>

          {/* subsection ClaimAll*/}
          <SectionItem open={openRewards}>
            <Rewards setOpen={setOpenRewards} />
          </SectionItem>
        </Box>
      </Box>
    </>
  );
};
export default MainPanel;
