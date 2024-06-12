import { useState } from "react";
import { Box, Container, Drawer, Grid } from "@mui/material";

import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";
import Leaderboard from "components/organisms/leaderboard";
import GameMachines from "components/organisms/machines";

import DownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import styled from "./styled.module.scss";

const Home = () => {
  const [openGames, setOpenGames] = useState<boolean>(false);

  const goToLeaderboard = () => window.scrollTo(0, document.body.scrollHeight);
  const goToMap = () => window.scrollTo(0, 0);

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Grid container>
          
          <Grid item xs={12}>
            <Box height={"100%"} overflow={"hidden"}>
              <InteractiveMap openGames={openGames} setOpenGames={setOpenGames} />
            </Box>

            <Box display={{ xs: "none", md: "flex" }} sx={{ opacity: openGames ? 0 : 1 }}>
              <Drawer
                open={true}
                anchor="left"
                variant="persistent"
                className={styled.mainDrawer}
                sx={{
                  "& .MuiDrawer-paper": {
                    backgroundColor: "transparent",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  },
                }}
              >
                <Box className={styled.container}>
                  <Leaderboard />
                </Box>
              </Drawer>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display={{ xs: "flex", md: "none" }} height={"100svh"}>
              <Box className={styled.downIcon} onClick={goToLeaderboard}>
                <span>leaderboard</span>
                <DownIcon />
              </Box>

              <Leaderboard showBack={true} goToMap={goToMap} />
            </Box>
          </Grid>
        </Grid>

        <GameMachines open={openGames} handleClose={() => setOpenGames(false)} />
      </Container>
    </Layout>
  );
};

export default Home;
