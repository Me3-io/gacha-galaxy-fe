import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaps, getMaps } from "reduxConfig/thunks/maps";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import rotateIcon from "assets/icons/rotate.svg";

import Button from "components/atoms/buttons/base";
import Layout from "components/templates/layout";
import GameBar from "components/organisms/game/bar";
import GameContainer from "components/organisms/game/container";

import styled from "./styled.module.scss";
import Alert from "components/molecules/alert";

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { code } = useParams();

  const buildings = useSelector(getMaps);
  const leaderboard = useSelector(getLeaderboard);

  const [onError, setOnError] = useState({ show: false, msg: "" });
  const [gameData, setGameData] = useState<any>({});
  const [onPlay, setOnPlay] = useState<boolean>(false);
  const [balance, setBalance] = useState(0);

  const handleBack = () => {
    navigate(`/${i18n.language}/home`);
  };

  const handleEnd = (response: any) => {
    if (response?.userAvailableKeys) {
      setBalance(response.userAvailableKeys);
    } else {
      setBalance(balance - gameData?.price);
    }
    setOnPlay(false);
  };

  const handlePlay = () => {
    if (balance === 0 || balance - gameData?.price < 0) {
      setOnError({ show: true, msg: t("game-no-balance") });
    } else {
      setOnPlay(true);
    }
  };

  useEffect(() => {
    if (buildings) {
      const game =
        (buildings &&
          buildings
            .find((building: any) => building?.games?.find((game: any) => game.code === code))
            ?.games?.find((game: any) => game.code === code)) ||
        null;

      setGameData(game);
    } else {
      dispatch(fetchMaps() as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildings]);

  useEffect(() => {
    if (leaderboard) {
      setBalance(leaderboard?.userKeys || 0);
    } else {
      dispatch(fetchLeaderboard() as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaderboard]);

  useEffect(() => {
    if (!gameData) {
      navigate(`/${i18n.language}/home/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Box className={styled.mobileRotate}>
          <Box>
            <img src={rotateIcon} alt="rotate" />
            <Typography>{t("game-rotate")}</Typography>
          </Box>
        </Box>

        <Box className={styled.backButton}>
          <Button onClick={handleBack}>
            <ArrowBackIcon /> {t("back")}
          </Button>
        </Box>

        <Grid container className={styled.main}>
          <Grid item container xs overflow={"hidden"}>
            <GameContainer
              onPlay={onPlay}
              balance={balance}
              handleEnd={handleEnd}
              gameData={gameData}
            />
          </Grid>

          <Grid item container xs="auto" className={styled.rightCol}>
            <GameBar
              onPlay={onPlay}
              balance={balance}
              handlePlay={handlePlay}
              gameData={gameData}
            />
          </Grid>
        </Grid>

        {onError.show && (
          <Alert onClose={() => setOnError({ show: false, msg: "" })}>
            {onError.msg || "Error"}
          </Alert>
        )}
      </Container>
    </Layout>
  );
};
export default Game;
