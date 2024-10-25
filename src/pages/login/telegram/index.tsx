import { useEffect, useState } from "react";
import loadingImg from "assets/loading.gif";
import { useConnect } from "thirdweb/react";
import { Box, CircularProgress, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "components/templates/layout";
import styled from "../styled.module.scss";
import useAlert from "hooks/alertProvider/useAlert";
import { client } from "config/thirdwebConfig";
import { setSocial } from "reduxConfig/slices/social";
import { useDispatch } from "react-redux";
import { getProfiles, inAppWallet } from "thirdweb/wallets";
import { customAxiosTelegram } from "utils/customAxios";
import { useTranslation } from "react-i18next";

const wallet = inAppWallet();

const TelegramLogin = () => {
  const { i18n } = useTranslation();
  const { connect } = useConnect();
  const { signature, message } = useParams();
  const { setAlert } = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!signature || !message) {
      console.log("Missing signature or message");
    } else {
      setLoading(true);
      const connectWallet = async () => {
        try {
          await wallet.connect({
            client,
            strategy: "auth_endpoint",
            payload: JSON.stringify({
              signature: signature,
              message: message,
            }),
            encryptionKey: "00000000000",
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
          console.log("wallet connect");
          console.log(wallet);
          const walletOrFn = await connect(wallet);
          if (walletOrFn) {
            setLoading(false);
            setError(false);
            const profiles = await getProfiles({ client });
            if (profiles) {
              const social = profiles[0]?.type || "";
              dispatch(setSocial(social) as any);
            } else {
              dispatch(setSocial("") as any);
            }
            return true;
          } else {
            setLoading(true);
            setError(true);
            return false;
          }
        } catch (error: any) {
          if (!error?.message.includes("There is already an authentication attempt in progress")) {
            setLoading(true);
            setError(true);
            return false;
          }
        }
      };

      customAxiosTelegram()
        .get("/user/validatesession")
        .then((response) => {
          setLoading(false);
          navigate(`/${i18n.language}/home`);
        })
        .catch((error: any) => {
          connectWallet();
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [signature, message]);

  useEffect(() => {
    if (error) {
      setAlert("Error at login", "error");
    }
  }, [error]);

  return (
    <Layout showHelp={false} showActions={false}>
      <Container maxWidth={false} disableGutters={true}>
        <Box className={styled.main}>
          <div
            className="w-screen h-screen flex flex-col gap-2 items-center justify-center"
            style={{ color: "aliceblue" }}
          >
            {loading && (
              <Box className={styled.loading}>
                <img src={loadingImg} alt="loading" />
              </Box>
            )}
          </div>
        </Box>
      </Container>
    </Layout>
  );
};

export default TelegramLogin;
