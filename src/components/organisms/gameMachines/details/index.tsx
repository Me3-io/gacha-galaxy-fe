import { Box, Grid, Grow, Stack, Typography } from "@mui/material";

import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

import machineIcon from "assets/images/maquina-capsule.svg";
import joystick from "assets/icons/joystick.svg";
import prize from "assets/icons/prize.svg";
import chance from "assets/icons/chance.svg";
import keyIcon from "assets/icons/key.svg";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import styled from "./styled.module.scss";

const ItemChance = ({ text, percent }: any) => {
  return (
    <Box className={styled.itemChance}>
      <img src={chance} alt="chance" />
      <Typography>{text}</Typography>
      <Typography className={styled.percent}>{percent}%</Typography>
    </Box>
  );
};

const GameDetails = ({ details, setDetails }: any) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const leaderboardData = useSelector(getLeaderboard);

  const goToGame = () => {
    if (!details?.code) return;
    navigate(`/${i18n.language}/game/${details.code}`);
  };

  return (
    <Grow in={true}>
      <Box className={styled.gameDetail}>
        <Button onClick={() => setDetails({ open: false })}>close</Button>

        <Box className={styled.dotted}></Box>
        <Grid container className={styled.container}>
          <Grid item xs={12} sm={6} md={5} className={styled.leftCol}>
            <Typography variant="h4" className={styled.title}>
              {details.name}
            </Typography>

            <Box className={styled.image}>
              <img src={machineIcon} alt="machineIcon" />
            </Box>
          </Grid>

          <Grid item container xs={12} sm={6} md={7} className={styled.rightCol}>
            <Grid item container xs={12} gap={"1.5rem"} flexWrap={{ md: "nowrap" }}>
              <Grid
                item
                sm={12}
                md={6}
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
                  {details?.howToPlay || "No instructions available"}
                </Typography>
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
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
                  {details?.prizes || "No data available"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={styled.info}>
              <Box display={"flex"} flexDirection={"row"}>
                <Typography className={styled.subtitle}>
                  DROP <br /> CHANCES
                </Typography>
                <Stack direction="row" spacing={3} flex={1} justifyContent={"center"}>
                  <ItemChance
                    text="Odds For Points"
                    percent={(details?.oddsForPoints * 100).toFixed(2) || "-"}
                  />
                  <ItemChance
                    text="Odds For Prize"
                    percent={(details?.oddsForPrize * 100).toFixed(2) || "-"}
                  />
                  <ItemChance
                    text="Odds For Nothing"
                    percent={(details?.oddsForNothing * 100).toFixed(2) || "-"}
                  />
                </Stack>
              </Box>
            </Grid>
            {/*<Grid item xs={12}>
          </Grid>*/}
            <Grid item container xs={12} className={styled.footer} alignItems="center">
              <Grid item xs={12} md={6} className={styled.keysContainer}>
                <Typography>
                  AVAILABLE <br />
                  KEYS
                </Typography>
                <Box className={styled.keys}>
                  <img src={keyIcon} alt="key" height={"36px"} />
                  <span>{leaderboardData?.userKeys || 0}</span>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display={"flex"}
                justifyContent={{ xs: "center", sm: "flex-end" }}
                pt={{ xs: "1.5rem", md: "0" }}
              >
                <ButtonDefault onClick={goToGame}>PLAY</ButtonDefault>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
};
export default GameDetails;
