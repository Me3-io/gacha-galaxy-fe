import { Box, Typography } from "@mui/material";
import Button from "components/atoms/buttons/animated";

import styled from "./styled.module.scss";

const Card = ({ name, bet }: any) => {
  return (
    <Box className={styled.card}>
      <Box className={styled.dotted}></Box>
      <Box className={styled.container}>
        <Typography className={styled.title}>{name}</Typography>
        <Box className={styled.tokens}>
          <span className={styled.minbet}>Minimum bet</span>

          <span className={styled.points}>{bet | 0}</span>
          <span className={styled.info}>Tokens</span>
        </Box>
        <Button onClick={() => alert("play game")}>PLAY</Button>
      </Box>
    </Box>
  );
};

export default Card;
