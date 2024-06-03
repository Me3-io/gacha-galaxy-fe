import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map/index2";

import { Box, Container, Drawer } from "@mui/material";
import { useState } from "react";

import styled from "./styled.module.scss";
import Leaderboard from "components/organisms/leaderboard";

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Box height={"100%"} overflow={"hidden"}>
          <InteractiveMap />
        </Box>
        <Drawer
          open={openDrawer}
          anchor="left"
          variant="persistent"
          onClose={() => setOpenDrawer(false)}
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
      </Container>
    </Layout>
  );
};

export default Home;
