import { Box, Grid, Typography } from "@mui/material";
import styled from "./styled.module.scss";

import machineIcon from "assets/images/maquina-capsule.svg";

import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

const GameDetails = ({ setOpenGames }: any) => {
  return (
    <Box className={styled.gameDetail}>
      <Button onClick={() => setOpenGames(false)}>close</Button>

      <Grid container className={styled.container}>
        <Grid item xs={12} sm={5} className={styled.leftCol}>
          <Typography variant="h4" className={styled.title}>
            CAPSULE
          </Typography>

          <Box className={styled.image}>
            <img src={machineIcon} alt="machineIcon" />
          </Box>
        </Grid>

        <Grid item container xs={12} sm={7} className={styled.rightCol}>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              HOW TO PLAY
            </Grid>
            <Grid item xs={6}>
              PRIZES
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className={styled.description}>DROP CHANCES</Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={styled.level}>LEVEL</Box>
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <ButtonDefault onClick={() => {}}>PLAY</ButtonDefault>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default GameDetails;
