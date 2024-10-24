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
import {customAxiosTelegram} from "utils/customAxios";
import { useTranslation } from "react-i18next";

const wallet = inAppWallet();

const TelegramLogin = () => {
    const { t, i18n } = useTranslation();
    const { connect } = useConnect();
    const { lang } = useParams();
    const { signature, message } = useParams();
    const { setAlert } = useAlert();
    const errorMessage = "Error generating wallet";
    const successMessage = " Generated wallet";
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [isGenerateWallet, setIsGenerateWallet] = useState(false);

    useEffect(() => {
        if (!signature || !message) {
            console.log('Missing signature or message');
        } else {
           //arranca el login
            const connectWallet = (async () => {
                try {
                    await wallet.connect({
                        client,
                        strategy: "auth_endpoint",
                        payload: JSON.stringify({
                            signature: signature,
                            message: message,
                        }),
                        encryptionKey: '00000000000',
                    })
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const walletOrFn = await connect(wallet);
                    if (walletOrFn) {
                      //corto loading
                        setIsGenerateWallet(true);
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
                        //no corto loading
                        //muesto error login
                        setIsGenerateWallet(false);
                        setError(true);
                        return false;
                    }


                } catch (error: any) {
                    if (!error?.message.includes("There is already an authentication attempt in progress")) {
                       //no corto loading
                         //muesto error login
                        console.log('Connection error:', error);
                        setIsGenerateWallet(false);
                        setError(true);
                        return false;
                    }
                }
            })

            customAxiosTelegram()
                .get("/user/validatesession?tag=telegram")
                .then(response => {
                  //corto loading
                    navigate(`/${i18n.language}/home`);
                })
                .catch((error: any) => {
                    connectWallet();
                });
            // eslint-disable-next-line react-hooks/exhaustive-deps

        }
    }, [signature, message]);

    useEffect(() => {
        if (error ) {
            setAlert("There was an error logging in", "error");
        }
    }, [error]);

    return (
        <Layout showHelp={false}>
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
