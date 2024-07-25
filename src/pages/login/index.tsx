import { Box, Container, Typography } from "@mui/material";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
//import { useAccount } from "wagmi";

import Layout from "components/templates/layout";
import Button from "components/atoms/buttons/default";
import Logo from "assets/logo.svg";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>

        <Box className={styled.logo}>
          <img src={Logo} alt="Logo" className={styled.imgLogo} />
        </Box>

        <Box className={styled.backgroundImage}></Box>

        <Box className={styled.main}>
          <Box className={styled.container}>
            <Typography variant="h1" className={styled.title}>
              Gacha Galaxy
            </Typography>

            <w3m-button />
            <Button onClick={() => open()} disabled={isConnected}>
              {t("enter-game")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default Login;
