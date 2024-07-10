import { Box, Container, Typography } from "@mui/material";

import Layout from "components/templates/layout";
import Navbar from "components/organisms/navbar";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import Button from "components/atoms/buttons/default";

import styled from "./styled.module.scss";

const Login = () => {
  const { open } = useWeb3Modal();
  const { isConnected, isConnecting } = useAccount();

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Navbar />

        <Box className={styled.backgroundImage}></Box>

        <Box className={styled.main}>
          <Box className={styled.container}>
            <Typography variant="h1" className={styled.title}>
              Gacha Galaxy
            </Typography>
            {!isConnected && (
              <Button onClick={() => open()} isLoading={isConnecting}>
                ENTER GAME
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default Login;
