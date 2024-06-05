import { useState } from "react";
import { Box, Container, Drawer } from "@mui/material";

import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";
import Leaderboard from "components/organisms/leaderboard";

import styled from "./styled.module.scss";

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Box height={"100%"} overflow={"hidden"}>
          <InteractiveMap openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
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
            <Leaderboard setOpenDrawer={setOpenDrawer} />
          </Box>
        </Drawer>
      </Container>
    </Layout>
  );
};

export default Home;
