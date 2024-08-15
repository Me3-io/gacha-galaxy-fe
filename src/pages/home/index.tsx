import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";
import GameMachines from "components/organisms/gameMachines";
import MainMenu from "components/organisms/menu";
import Campaign from "components/organisms/campaing";

import DownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useDispatch } from "react-redux";
import { fetchBuildings } from "reduxConfig/thunks/buildings";
import { fetchLeaderboard } from "reduxConfig/thunks/leaderboard";
import { fetchClaims } from "reduxConfig/thunks/claim";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
//import TourModal from "components/organisms/tour";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [games, setGames] = useState({ open: false, data: [] });
  const [campaing, setCampaing] = useState({ open: false, id: "" });

  const goToLeaderboard = () => window.scrollTo(0, document.body.scrollHeight);
  const goToMap = () => window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(fetchBuildings() as any);
    dispatch(fetchLeaderboard() as any);
    dispatch(fetchClaims() as any);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Grid container>
          <Grid item xs={12}>
            <Box height={"100%"} overflow={"hidden"}>
              <InteractiveMap setGames={setGames} setCampaing={setCampaing} />
            </Box>

            <Box display={{ xs: "none", md: "flex" }} className={styled.mainDrawer}>
              <Box className={styled.container}>
                <MainMenu
                  showBack={false}
                  openGames={games.open}
                  setGames={setGames}
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
                setGames={setGames}
                setCampaing={setCampaing}
              />
            </Box>
          </Grid>
        </Grid>

        <GameMachines games={games} handleClose={() => setGames({ open: false, data: [] })} />
        <Campaign campaing={campaing} handleClose={() => setCampaing({ open: false, id: "" })} />

        {/*<TourModal open={showTour} handleClose={() => setShowTour(false)} />*/}
      </Container>
    </Layout>
  );
};

export default Home;
