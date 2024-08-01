import { Box, Grid, Grow, Stack, Typography } from "@mui/material";

import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

import machineIcon from "assets/images/capsule-machine-angle-view.png";
import joystick from "assets/icons/joystick.svg";
import prize from "assets/icons/prize.svg";

import keyIcon from "assets/icons/key.svg";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import styled from "./styled.module.scss";

const ItemChance = ({ text, percent, rewards }: any) => {
  return (
    <Box className={styled.itemChance}>
      <Box className={styled.infoChance}>
        <Typography>{text}</Typography>
        <Typography className={styled.percent}>{percent}%</Typography>
      </Box>

      {rewards && (
        <Box className={styled.rewards}>
          {rewards.map((row: any, pos: number) => (
            <Box key={pos} className={styled.reward}>
              <img src={row.image[0].url} alt={"icon"} />
              <Typography>
                {row.name} 
              </Typography>
              <span>{(row?.winningOdds * 100).toFixed(2) || "-"}%</span>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const GameDetails = ({ details, setDetails }: any) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const leaderboardData = useSelector(getLeaderboard);

  const goToGame = () => {
    if (!details?.code) return;
    navigate(`/${i18n.language}/game/${details.code}`);
  };

  return (
    <Grow in={true}>
      <Box className={styled.gameDetail}>
        <Button onClick={() => setDetails({ open: false })}>{t("close")}</Button>

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
                  {t("details-how-to-play")}
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
                  {t("details-prizes")}
                </Typography>
                <img src={prize} alt="prize" />
                <Typography className={styled.text}>
                  {details?.prizes || "No data available"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={styled.info}>
              <Box display={"flex"} flexDirection={"row"} gap={2}>
                <Typography
                  //pr={2}
                  className={styled.subtitle}
                  dangerouslySetInnerHTML={{ __html: t("details-drop-chances") }}
                  sx={{ width: "28%" }}
                ></Typography>
                <Stack
                  direction="column"
                  spacing={2}
                  flex={1}
                  justifyContent={"center"}
                  overflow={"auto"}
                  //pt={1}
                >
                  {details?.oddsForPoints && (
                    <ItemChance
                      text={t("details-odds-points")}
                      percent={(details?.oddsForPoints * 100).toFixed(2) || "-"}
                    />
                  )}

                  {details?.oddsForPrize && (
                    <ItemChance
                      text={t("details-odds-prize")}
                      percent={(details?.oddsForPrize * 100).toFixed(2) || "-"}
                      rewards={details?.rewards}
                    />
                  )}

                  {details?.oddsForNothing && (
                    <ItemChance
                      text={t("details-odds-nothing")}
                      percent={(details?.oddsForNothing * 100).toFixed(2) || "-"}
                    />
                  )}
                </Stack>
              </Box>
            </Grid>
            {/*<Grid item xs={12}>
          </Grid>*/}
            <Grid item container xs={12} className={styled.footer} alignItems="center">
              <Grid item xs={12} md={6} className={styled.keysContainer}>
                <Typography
                  dangerouslySetInnerHTML={{ __html: t("details-available-keys") }}
                ></Typography>
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
                <ButtonDefault onClick={goToGame}>{t("play").toUpperCase()}</ButtonDefault>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
};
export default GameDetails;
