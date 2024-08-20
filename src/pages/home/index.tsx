import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";
import MainCarousel from "components/organisms/mainCarousel";
import MainMenu from "components/organisms/menu";

import DownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useDispatch } from "react-redux";
import { fetchBuildings } from "reduxConfig/thunks/buildings";
import { fetchLeaderboard } from "reduxConfig/thunks/leaderboard";
import { fetchClaims } from "reduxConfig/thunks/claim";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import { ReactTourProvider } from "hooks/reactourProvider";

import Campaign from "components/organisms/campaing";
import GameDetails from "components/organisms/gameDetails";
//import TourModal from "components/organisms/tour";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [listGames, setListGames] = useState([]);
  const [listCampaings, setListCampaings] = useState([]);

  const [game, setGame] = useState({});
  const [campaing, setCampaing] = useState({});

  const goToLeaderboard = () => window.scrollTo(0, document.body.scrollHeight);
  const goToMap = () => window.scrollTo(0, 0);

  const handleClose = () => {
    setListGames([]);
    setListCampaings([]);
  };

  useEffect(() => {
    dispatch(fetchBuildings() as any);
    dispatch(fetchLeaderboard() as any);
    dispatch(fetchClaims() as any);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactTourProvider>
      <Layout showHelp={true}>
        <Container maxWidth={false} disableGutters={true}>
          <Grid container>
            <Grid item xs={12}>
              <Box height={"100%"} overflow={"hidden"}>
                <InteractiveMap setGames={setListGames} setCampaings={setListCampaings} />
              </Box>

              <Box display={{ xs: "none", md: "flex" }} className={styled.mainDrawer}>
                <Box className={styled.container}>
                  <MainMenu
                    showBack={false}
                    //openGames={listGames.open}
                    setGame={setGame}
                    setCampaing={setCampaing}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display={{ xs: "flex", md: "none" }} height={"100svh"}>
                <Box className={styled.downIcon} onClick={goToLeaderboard}>
                  <span>{t("leaderboard")}</span>
                  <DownIcon />
                </Box>

                <MainMenu
                  showBack={true}
                  goToMap={goToMap}
                  setGame={setGame}
                  setCampaing={setCampaing}
                />
              </Box>
            </Grid>
          </Grid>

          <MainCarousel
            listGames={listGames}
            setGame={setGame}
            listCampaings={listCampaings}
            setCampaing={setCampaing}
            handleClose={handleClose}
          />

          <GameDetails details={game} setDetails={setGame} />
          <Campaign details={campaing} setDetails={setCampaing} />
          
        </Container>
      </Layout>
    </ReactTourProvider>
  );
};

export default Home;
