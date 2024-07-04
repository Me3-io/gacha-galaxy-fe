import { Box } from "@mui/material";
import styled from "./styled.module.scss";

import Button from "components/atoms/buttons/base";

const GameDetails = ({ setOpenGames }: any) => {
  return (
    <Box className={styled.gameDetail}>
      <Button onClick={() => setOpenGames(false)}>
        close
      </Button>
    </Box>
  );
};
export default GameDetails;
