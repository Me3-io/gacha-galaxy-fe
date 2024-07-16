import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "components/atoms/buttons/base";
import Layout from "components/templates/layout";
import ActionsBar from "components/organisms/actionsbar";
import GameBar from "components/organisms/gameBar";

import rotateIcon from "assets/icons/rotate.svg";

import styled from "./styled.module.scss";

const Game = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { idgame } = useParams();

  const handleClick = () => {
    navigate(`/${i18n.language}/`);
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
          <Button onClick={handleClick}>
            <ArrowBackIcon /> Back
          </Button>
        </Box>

        <Grid container className={styled.main}>
          <Grid item xs overflow={"hidden"}>
            <Typography color={"#fff"} textAlign={"center"} p={5} fontSize={"2rem"}>
              game: {idgame}
            </Typography>
          </Grid>

          <Grid item xs="auto" container className={styled.rightCol}>
            <GameBar />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Game;
