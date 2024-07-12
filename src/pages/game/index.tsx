import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Layout from "components/templates/layout";
import ActionsBar from "components/organisms/actionsbar";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styled from "./styled.module.scss";
import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

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

        <Box className={styled.backButton}>
          <Button onClick={handleClick}>
            <ArrowBackIcon /> Back
          </Button>
        </Box>

        <Grid container className={styled.main}>
          <Grid item xs>
            <Typography color={"#fff"} textAlign={"center"} p={5} fontSize={"2rem"}>
              game: {idgame}
            </Typography>
          </Grid>
          <Grid item container className={styled.rightCol}>
            <Box className={styled.dotted}></Box>
            <Grid item container xs={12} className={styled.container}>
              <Grid item xs={12} className={styled.info}>
                <Typography variant="h5" className={styled.title}>
                  INSTRUCTIONS
                </Typography>

                <Typography className={styled.text}>
                  The original Gacha game! Get your keys out, and get ready to play for randomized
                  loot where every key grants you a prize.
                </Typography>
              </Grid>

              <Grid item xs={12} className={styled.balance}>
                <Typography variant="h5" className={styled.title}>
                  YOUR KEYS <br/> BALANCE
                </Typography>

                <Typography className={styled.text}>7</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} className={styled.footer}>
              <ButtonDefault>PLAY</ButtonDefault>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Game;
