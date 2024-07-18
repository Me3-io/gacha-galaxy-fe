import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";
import GameMachines from "components/organisms/gameMachines";
import MainMenu from "components/organisms/menu";
import ActionsBar from "components/organisms/actionsbar";
import Campaign from "components/organisms/campaing";

import DownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState({ open: false, data: [] });
  const [campaing, setCampaing] = useState({ open: false, id: "" });

  const goToLeaderboard = () => window.scrollTo(0, document.body.scrollHeight);
  const goToMap = () => window.scrollTo(0, 0);

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <ActionsBar />

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
              {/*<Drawer
                open={true}
                anchor="left"
                variant="permanent"
                className={styled.mainDrawer}
                sx={{
                  "& .MuiDrawer-paper": {
                    backgroundColor: "transparent",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    zIndex: 1,
                  },
                }}
              ></Drawer>*/}
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
      </Container>
    </Layout>
  );
};

export default Home;
