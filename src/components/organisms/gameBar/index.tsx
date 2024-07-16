import { Box, Grid, Typography } from "@mui/material";
import ButtonDefault from "components/atoms/buttons/default";
import keyIcon from "assets/icons/key.svg";

import styled from "./styled.module.scss";

const GameBar = () => {
  return (
    <>
      <Box className={styled.dotted}></Box>
      <Grid item container xs={12} className={styled.container}>
        <Grid item xs={12} className={styled.info}>
          <Typography variant="h5" className={styled.title}>
            INSTRUCTIONS
          </Typography>

          <Typography className={styled.text}>
            The original Gacha game! Get your keys out, and get ready to play for randomized loot
            where every key grants you a prize.
          </Typography>
        </Grid>

        <Grid item xs={12} className={styled.balanceContainer}>
          <Typography variant="h5" className={styled.title}>
            YOUR KEYS <br /> BALANCE
          </Typography>

          <Box className={styled.balance}>
            <img src={keyIcon} alt="key" height={"40px"} />
            <Typography className={styled.text}>7</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} className={styled.keyContainer}>
          <Typography variant="h5" className={styled.title}>
            PLAY PRICE
          </Typography>

          <Box className={styled.keys}>
            <img src={keyIcon} alt="key" />
            <Typography className={styled.text}>1 KEY</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} className={styled.footer}>
        <ButtonDefault>PLAY</ButtonDefault>
      </Grid>
    </>
  );
};
export default GameBar;
