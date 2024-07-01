import { Box } from "@mui/material";
import { useState } from "react";

import Leaderboard from "./sections/leaderboard";
import EarnPoints from "./sections/earnPoints";
import GetTokens from "./sections/getTokens";
import Menu from "./sections/menu";

import styled from "./styled.module.scss";

const MainMenu = ({ showBack = false, goToMap, openGames = false }: any) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [openTokens, setOpenTokens] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
            opacity={openPoints || openTokens || openMenu ? 0 : 1}
          />

          <Box
            component="section"
            className={styled.submenu}
            left={openPoints ? "0!important" : "100%"}
          >
            <EarnPoints setOpenPoints={setOpenPoints} />
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
          >
            <Menu setOpenMenu={setOpenMenu} />
          </Box>
        </>
      )}
    </Box>
  );
};
export default MainMenu;
