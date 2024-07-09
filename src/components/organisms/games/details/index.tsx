import { Box, Grid, Stack, Typography } from "@mui/material";
import styled from "./styled.module.scss";

import machineIcon from "assets/images/maquina-capsule.svg";

import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

import joystick from "assets/icons/joystick.svg";
import prize from "assets/icons/prize.svg";
import chance from "assets/icons/chance.svg";

const ItemChance = ({ text, percent }: any) => {
  return (
    <Box className={styled.itemChance}>
      <img src={chance} alt="chance" />
      <Typography>{text}</Typography>
      <Typography className={styled.percent}>{percent}%</Typography>
    </Box>
  );
};

const GameDetails = ({ setOpenDetails }: any) => {
  return (
    <Box className={styled.gameDetail}>
      <Button onClick={() => setOpenDetails(false)}>close</Button>

      <Box className={styled.dotted}></Box>
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
          <Grid item xs={12} gap={4} display={"flex"}>
            <Grid
              item
              xs={6}
              className={styled.info}
              alignItems={"flex-end"}
              textAlign={"right"}
              height={"100%"}
            >
              <Typography variant="h5" className={styled.subtitle}>
                HOW TO PLAY
              </Typography>
              <img src={joystick} alt="joystick" />
              <Typography className={styled.text}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              className={styled.info}
              alignItems={"flex-start"}
              textAlign={"left"}
              height={"100%"}
            >
              <Typography variant="h5" className={styled.subtitle}>
                PRIZES
              </Typography>
              <img src={prize} alt="prize" />
              <Typography className={styled.text}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={styled.info}>
            <Stack direction="row" spacing={2}>
              <Typography className={styled.subtitle}>
                DROP <br /> CHANCES
              </Typography>
              <ItemChance text="Lorem ipsum dolor" percent="3" />
              <ItemChance text="Lorem ipsum dolor" percent="1.88" />
              <ItemChance text="Lorem ipsum dolor" percent="3.8" />
              <ItemChance text="Lorem ipsum dolor" percent="4.40" />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box className={styled.level}>LEVEL</Box>
          </Grid>
          <Grid item xs={12} pt={2} display={"flex"} justifyContent={"center"}>
            <ButtonDefault>PLAY</ButtonDefault>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default GameDetails;
