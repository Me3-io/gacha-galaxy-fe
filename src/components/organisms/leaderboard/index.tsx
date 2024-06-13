import { Box } from "@mui/material";
import { useState } from "react";

import Main from "./sections/main";

import styled from "./styled.module.scss";
import EarnPoints from "./sections/earnPoints";
import GetTokens from "./sections/getTokens";

const Leaderboard = ({ showBack = false, goToMap }: any) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [openTokens, setOpenTokens] = useState(false);

  return (
    <Box className={styled.panel}>

      <Main
        showBack={showBack}
        goToMap={goToMap}
        setOpenPoints={setOpenPoints}
        setOpenTokens={setOpenTokens}
        opacity={openPoints || openTokens ? 0 : 1}
      />

      <Box
        component="section"
        className={styled.submenu}
        right={openPoints ? "0!important" : "100%"}
      >
        <EarnPoints setOpenPoints={setOpenPoints} />
      </Box>

      <Box
        component="section"
        className={styled.submenu}
        right={openTokens ? "0!important" : "100%"}
      >
        <GetTokens setOpenTokens={setOpenTokens} />
      </Box>
    </Box>
  );
};
export default Leaderboard;
