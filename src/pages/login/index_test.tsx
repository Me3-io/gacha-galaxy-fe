import { Box, Container } from "@mui/material";

import { modalConfig } from "config/thirdwebConfig";
import { useConnectModal } from "thirdweb/react";

import Layout from "components/templates/layout";
import Button from "components/atoms/buttons/default";
import Logo from "assets/logo.svg";
import LogoGacha from "assets/logo-gacha-galaxy.png";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import waitForElement from "utils/waitForElement";
import ModalLegal from "components/molecules/legal";
import { useState } from "react";
import TelegramLoginButton from "components/organisms/social/telegram";
import GoogleLoginButton from "components/organisms/social/google";

const Login = () => {
  const { t } = useTranslation();
  const { connect } = useConnectModal();

  const legalCheckLS = JSON.parse(localStorage?.getItem("legalCheck") || "false");
  const [modalLegal, setModalLegal] = useState(false);
  const [legalCheck, setLegalCheck] = useState(legalCheckLS);

  const handleConnect = () => {
    if (!legalCheck) {
      setModalLegal(true);
      return;
    }
    openModal();
  };

  const handleCloseLegal = (proceed: boolean) => {
    setModalLegal(false);
    if (proceed) {
      setLegalCheck(true);
      openModal();
    }
  };

  const openModal = async () => {
    try {
      waitForElement(".css-1wcqaod").then((element: any) => (element.style.display = "none"));
      const response = await connect({ ...modalConfig, size: "wide" });
      console.log("response: ", response.getAccount(), response.getConfig(), response.getChain());
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
              <img src={LogoGacha} alt="Gacha Galaxyyyy" />
            </Box>

            <Button onClick={handleConnect}>{t("enter-game")}</Button>

            <TelegramLoginButton />
            <GoogleLoginButton />
          </Box>
        </Box>
      </Container>

      {modalLegal && <ModalLegal handleClose={handleCloseLegal} />}
    </Layout>
  );
};
export default Login;
