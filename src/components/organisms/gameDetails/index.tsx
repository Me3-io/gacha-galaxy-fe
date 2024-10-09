import { Box, Grid, Grow, Modal, Typography } from "@mui/material";

import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

import joystick from "assets/icons/joystick.svg";
import prize from "assets/icons/prize.svg";

import keyIcon from "assets/icons/key.svg";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import { useContext, useEffect } from "react";
import { MapContext } from "pages/home";
import { setGame } from "reduxConfig/slices/game";
import waitForElement from "utils/waitForElement";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import bg from "assets/images/playroom.png";
import styled from "./styled.module.scss";

const capsuleIcon = `${process.env.REACT_APP_ASSETS_URL}/Capsule/capsule-machine-angle-view.png`;
const clawMachineIcon = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/Angled_View.png`;

const ItemChance = ({ text, percent }: any) => {
  return (
    <Box className={styled.itemChance}>
      <Typography className={styled.percent}>{percent}%</Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};

const GameDetails = () => {
  const dispatch = useDispatch();
  const { game: details, setGame: setDetails, buildingData, map } = useContext(MapContext);

  const open = !!details?.code;
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const leaderboardData = useSelector(getLeaderboard);

  const goToGame = () => {
    if (!details?.code) return;
    dispatch(setGame(details));
    navigate(`/${i18n.language}/game/${details.code}`, {
      state: { map: map.code },
    });
  };

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") setDetails({});
  };

  const getMachineIcon = (code: string) => {
    switch (code) {
      case "claw-machine":
        return clawMachineIcon;
      default:
        return capsuleIcon;
    }
  };

  useEffect(() => {
    if (!open) return;

    waitForElement("#rewards").then((element: any) => {
      const handleWheel = (evt: any) => {
        evt.preventDefault();
        element.scrollLeft += evt?.deltaY;
      };

      element.addEventListener("wheel", handleWheel);
      return () => element.removeEventListener("wheel", handleWheel);
    });
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} className={styled.modalContainer}>
      <>
        <Box
          className={styled.background}
          sx={{
            backgroundImage: `url(${buildingData?.background?.url || bg})`,
          }}
        />

        <Box className={styled.backButton}>
          <Button onClick={(evt: any) => onClose(evt, "close")}>
            <ArrowBackIcon /> {t("back")}
          </Button>
        </Box>

        <Box className={styled.modal}>
          <Grow in={open}>
            <Box className={styled.gameDetail}>
              <Box className={styled.dotted}></Box>
              <Grid container className={styled.container}>
                <Grid item xs={12} sm={6} md={5} className={styled.leftCol}>
                  <Typography variant="h4" className={styled.title}>
                    {details.name}
                  </Typography>

                  <Box className={styled.image}>
                    <img src={getMachineIcon(details?.code)} alt="machineIcon" loading="lazy" />
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
                      <Typography className={styled.text}>{details?.prizes || "No data available"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={styled.info} p={"1rem!important"}>
                    <Box className={styled.dropChances}>
                      <Typography pb={1} className={styled.subtitle}>
                        {t("details-drop-chances")}
                      </Typography>

                      <Box display={"flex"} flexDirection={"row"} gap={2}>
                        {details?.oddsForPoints && (
                          <ItemChance
                            text={t("details-odds-points")}
                            percent={(details?.oddsForPoints * 100).toFixed(1) || "-"}
                          />
                        )}

                        {details?.oddsForPrize && (
                          <ItemChance
                            text={t("details-odds-prize")}
                            percent={(details?.oddsForPrize * 100).toFixed(1) || "-"}
                          />
                        )}

                        {details?.oddsForNothing && (
                          <ItemChance
                            text={t("details-odds-nothing")}
                            percent={(details?.oddsForNothing * 100).toFixed(1) || "-"}
                          />
                        )}
                      </Box>
                    </Box>

                    <Box className={styled.rewards} mb={1}>
                      <Box id="rewards">
                        {details?.rewards?.map((row: any, pos: number) => (
                          <Box key={pos} className={styled.reward}>
                            <Box>
                              <Typography>{row.name}</Typography>
                              <span>{(row?.winningOdds * 100).toFixed(1) || "-"}%</span>
                            </Box>
                            <img src={row?.image[0]?.url} alt={"icon"} />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item container xs={12} className={styled.footer} alignItems="center">
                    <Grid item xs={12} md={6} className={styled.keysContainer}>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: t("details-available-keys"),
                        }}
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
        </Box>
      </>
    </Modal>
  );
};
export default GameDetails;
