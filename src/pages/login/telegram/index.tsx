import { useEffect, useState } from "react";
import { chain } from "config/thirdwebConfig";
import { useConnect } from "thirdweb/react";
import { Box, CircularProgress, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { inAppWallet } from "thirdweb/wallets";
import Layout from "components/templates/layout";
import styled from "../styled.module.scss";
import { createThirdwebClient } from "thirdweb";
import useAlert from "hooks/alertProvider/useAlert";

const wallet = inAppWallet({
  smartAccount: {
    sponsorGas: true,
    chain: chain,
  },
});

const TelegramLogin = () => {
  const { connect } = useConnect();
  const { signature, message } = useParams();
  const { setAlert } = useAlert();
  const errorMessage = "Error generating wallet";
  const successMessage = " Generated wallet";

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [isGenerateWallet, setIsGenerateWallet] = useState(false);

  useEffect(() => {
    if (!signature || !message) {
      console.log("Missing signature or message");
    } else {
      const connectWallet = async () => {
        try {
          const walletOrFn = await connect(async () => {
            try {
              const client = createThirdwebClient({
                clientId: "5c2008dc15fde34d454e47b09661e39d",
              });
              await wallet.connect({
                client,
                strategy: "auth_endpoint",
                payload: JSON.stringify({
                  signature: signature,
                  message: message,
                }),
                encryptionKey: "00000000000",
              });
              console.log("Connection wallet:", wallet);
              return wallet;
            } catch (error) {
              console.log("Connection error:", error);
              setIsGenerateWallet(false);
              setError(true);
              return wallet;
            }
          });
          if (walletOrFn) {
            setIsGenerateWallet(true);
            setError(false);
            return true;
          } else {
            setIsGenerateWallet(false);
            setError(true);
            return false;
          }
        } catch (error) {
          console.log("Connection error:", error);
          setIsGenerateWallet(false);
          setError(true);
          return false;
        }
      };
      connectWallet();
    }
  }, [signature, message]);

  if (error && !isGenerateWallet) {
    setAlert(errorMessage, "error");
  }

  if (!error && isGenerateWallet) {
    setAlert(successMessage, "success");
  }

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={true}>
        <Box className={styled.main}>
          <div
            className="w-screen h-screen flex flex-col gap-2 items-center justify-center"
            style={{ color: "aliceblue" }}
          >
            {!error && !isGenerateWallet && (
              <Box className={styled.loading}>
                <CircularProgress className={styled.spinner} size={36} />
                Generating Wallet...{" "}
              </Box>
            )}
          </div>
        </Box>
      </Container>
    </Layout>
  );
};

export default TelegramLogin;
