import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "components/atoms/buttons/base";
import Layout from "components/templates/layout";
import ActionsBar from "components/organisms/actionsbar";

import GameBar from "components/molecules/gameBar";
import GameAnimation from "components/molecules/gameAnimation";

import rotateIcon from "assets/icons/rotate.svg";
import bgImage from "assets/images/Capsule_Machine_Front_View.png";

import styled from "./styled.module.scss";

const Game = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { idgame } = useParams();

  const handleClick = () => {
    navigate(`/${i18n.language}/home`);
  };

  const handleEnd = () => {
    if (gameState.step === "success") {
      alert("You Win!! (show modal)");
    }
  };

  const [gameState, setGameState] = useState({ step: "init", source: "", poster: "" });

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
          <Button onClick={handleClick}>
            <ArrowBackIcon /> Back
          </Button>
        </Box>

        <Grid container className={styled.main}>
          <Grid item container xs overflow={"hidden"}>
            <GameAnimation {...gameState} bg={bgImage} onEnded={handleEnd} />
          </Grid>

          <Grid item container xs="auto" className={styled.rightCol}>
            <GameBar gameState={gameState} setGameState={setGameState} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Game;
