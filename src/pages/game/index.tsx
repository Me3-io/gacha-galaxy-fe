import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "components/atoms/buttons/base";
import Layout from "components/templates/layout";
import ActionsBar from "components/organisms/actionsbar";

import GameBar from "components/molecules/gameBar";
import GameContainer from "components/organisms/game";

import rotateIcon from "assets/icons/rotate.svg";

import styled from "./styled.module.scss";

const Game = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { idgame } = useParams();

  const [onPlay, setOnPlay] = useState(false);
  const [balance, setBalance] = useState(7);

  const handleBack = () => {
    navigate(`/${i18n.language}/home`);
  };

  const handleEnd = (status: string) => {
    setOnPlay(false);
    setBalance(balance - 1);
    alert("You Win!! (show modal): " + status);
  };

  const handlePlay = () => {
    if (balance === 0) {
      alert("No keys available");
      return
    }
    setOnPlay(true);
  };

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <ActionsBar />

        <Box className={styled.mobileRotate}>
          <Box>
            <img src={rotateIcon} alt="rotate" />
            <Typography>
              To have a better gaming experience, please rotate your phone horizontally.
            </Typography>
          </Box>
        </Box>

        <Box className={styled.backButton}>
          <Button onClick={handleBack}>
            <ArrowBackIcon /> Back
          </Button>
        </Box>

        <Grid container className={styled.main}>
          <Grid item container xs overflow={"hidden"}>
            <GameContainer onPlay={onPlay} balance={balance} handleEnd={handleEnd} />
          </Grid>

          <Grid item container xs="auto" className={styled.rightCol}>
            <GameBar onPlay={onPlay} balance={balance} handlePlay={handlePlay} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Game;
