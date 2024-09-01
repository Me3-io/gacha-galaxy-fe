// src/GoogleLoginButton.tsx
import React from 'react';
import { customAxiosLocalTest }  from "utils/customAxios";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";

const TelegramLoginButton: React.FC = () => {

  const fetchTelegram = (data: TelegramAuthData) => {
    console.log(data);
    //if (!poolInfo.telegram_completed) {
      //setLoading(true);      
      customAxiosLocalTest()
        .post("/user/telegram", {
          auth_data: `tma ${data.auth_date}:${data.hash}`,
          user_id: data.id,
          first_name: data.first_name,
          last_name: data.last_name
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
    <LoginButton
    botUsername={process.env.REACT_APP_TELEGRAM_BOT_USERNAME ?? "7328826957:AAGAS2wlJeqa78O4uvmbz8BAkEwqXpFxZ10"}
    onAuthCallback={(data) => fetchTelegram(data)}
    buttonSize="medium" // "large" | "medium" | "small"
    cornerRadius={0} // 0 - 20
    showAvatar={false} // true | false
    lang="en"
  />
);

};

export default TelegramLoginButton;

