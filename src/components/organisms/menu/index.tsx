import { Box } from "@mui/material";
import { useState } from "react";

import Leaderboard from "./sections/leaderboard";
import EarnPoints from "./sections/earnPoints";
import GetTokens from "./sections/getTokens";
import Menu from "./sections/menu";

import styled from "./styled.module.scss";
import ClaimAll from "./sections/claimAll";

const MainMenu = ({ showBack = false, goToMap, openGames = false, setGames, setCampaing }: any) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [openTokens, setOpenTokens] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openClaimAll, setOpenClaimAll] = useState(false);

  const opacity = openPoints || openTokens || openMenu || openClaimAll ? 0 : 1;

  return (
    <Box className={styled.panel}>
      {!openGames && (
        <>
          <Leaderboard
            showBack={showBack}
            goToMap={goToMap}
            setOpenPoints={setOpenPoints}
            setOpenTokens={setOpenTokens}
            setOpenMenu={setOpenMenu}
            opacity={opacity}
          />

          <Box
            component="section"
            className={styled.submenu}
            left={openPoints ? "0!important" : "100%"}
          >
            <EarnPoints
              setOpenPoints={setOpenPoints}
              setGames={setGames}
              setCampaing={setCampaing}
            />
          </Box>

          <Box
            component="section"
            className={styled.submenu}
            left={openTokens ? "0!important" : "100%"}
          >
            <GetTokens setOpenTokens={setOpenTokens} />
          </Box>

          <Box
            component="section"
            className={styled.submenu}
            left={openMenu ? "0!important" : "100%"}
            sx={{ opacity : openClaimAll ? 0 : 1 }}
          >
            <Menu setOpenMenu={setOpenMenu} setOpenClaimAll={setOpenClaimAll} />
          </Box>

          <Box
            component="section"
            className={styled.submenu}
            left={openClaimAll ? "0!important" : "100%"}
          >
            <ClaimAll setOpenClaimAll={setOpenClaimAll} />
          </Box>
        </>
      )}
    </Box>
  );
};
export default MainMenu;
