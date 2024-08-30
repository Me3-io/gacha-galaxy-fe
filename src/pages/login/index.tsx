import { Box, Container } from "@mui/material";

import { modalConfig } from "config/thirdwebConfig";
import { useConnectModal } from "thirdweb/react";

import Layout from "components/templates/layout";
import Button from "components/atoms/buttons/default";
import Logo from "assets/logo.svg";
import LogoGacha from "assets/logo-gacha.svg";

import { LoginButton, TelegramAuthData } from "@telegram-auth/react";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import waitForElement from "utils/waitForElement";
import ModalLegal from "components/molecules/legal";
import { useState } from "react";
import customAxios, { customAxiosLocalTest }  from "utils/customAxios";

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
      await connect({ ...modalConfig, size: "wide" });
    } catch (error) {
      console.error(error); 
    }
  };

  const fetchTelegram = (data: TelegramAuthData) => {
    console.log(data);
    //if (!poolInfo.telegram_completed) {
      //setLoading(true);      
      customAxiosLocalTest()
        .post("/user/telegram", {
          user_id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          auth_date: data.auth_date,
          hash: data.hash
        })
        .then((response) => {
          //setLoading(false);
          alert(response);
          if (response?.data?.status === "error") {
            
            //setShowAlertInfo({ open: true, text: response?.data?.message || "error" });
          } else {
            //setOpenSuccessModal(completeTelegram);
          }
        })
        .catch((error) => {
          //setLoading(false);
          console.error(error);
        });
        /*
    } else {
      setOpenSuccessModal(completeTelegram);
    }*/
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

            <LoginButton
                botUsername={process.env.REACT_APP_TELEGRAM_BOT_USERNAME ?? "7328826957:AAGAS2wlJeqa78O4uvmbz8BAkEwqXpFxZ10"}
                onAuthCallback={(data) => fetchTelegram(data)}
                buttonSize="medium" // "large" | "medium" | "small"
                cornerRadius={0} // 0 - 20
                showAvatar={false} // true | false
                lang="en"
              />

          </Box>          
        </Box>
      </Container>

      {modalLegal && <ModalLegal handleClose={handleCloseLegal} />}
    </Layout>
  );
};
export default Login;
