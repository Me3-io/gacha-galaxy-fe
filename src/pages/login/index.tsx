import { Box, Container, Typography } from "@mui/material";

import { client, wallets } from "hooks/thirdwebClient";
import { useConnectModal } from "thirdweb/react";

import Layout from "components/templates/layout";
import Button from "components/atoms/buttons/default";
import Logo from "assets/logo.svg";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { connect } = useConnectModal();

  const handleConnect = async () => {
    try {
      await connect({ client, wallets, size: "compact", theme: "dark" });
      
    } catch (error) { }
  };

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

            <Button onClick={handleConnect}>{t("enter-game")}</Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default Login;
