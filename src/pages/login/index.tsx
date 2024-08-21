import { Box, Container } from "@mui/material";

import { modalConfig } from "config/thirdwebConfig";
import { useConnectModal } from "thirdweb/react";

import Layout from "components/templates/layout";
import Button from "components/atoms/buttons/default";
import Logo from "assets/logo.svg";
import LogoGacha from "assets/logo-gacha.svg";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import waitForElement from "utils/waitForElement";

const Login = () => {
  const { t } = useTranslation();
  const { connect } = useConnectModal();

  const handleConnect = async () => {
    try {
      waitForElement(".css-1wcqaod").then((element: any) => (element.style.display = "none"));
      await connect({ ...modalConfig, size: "wide" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Box className={styled.logo}>
          <img src={Logo} alt="Logo" />
        </Box>

        <Box className={styled.backgroundImage}></Box>

        <Box className={styled.main}>
          <Box className={styled.container}>
            <Box className={styled.mainLogo}>
              <img src={LogoGacha} alt="Gacha Galaxy" />
            </Box>

            {/*<Button onClick={handleConnect}>{t("enter-game")}</Button>*/}
            <Button disabled>COMING SOON</Button>

          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default Login;
