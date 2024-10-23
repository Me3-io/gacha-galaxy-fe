import { useEffect, useState } from "react";
import { chain } from "config/thirdwebConfig";
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

const wallet = inAppWallet();

const TelegramLogin = () => {
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
                    });
                    const walletOrFn = await connect(wallet)
                    if (walletOrFn) {
                        const account = walletOrFn?.getAccount();
                        setIsGenerateWallet(true);
                        setError(false);
                        debugger
                        const profiles = await getProfiles({ client });
                        if (profiles) {
                            const social = profiles[0]?.type || "";
                            dispatch(setSocial(social) as any);
                        } else {
                            dispatch(setSocial("") as any);
                        }
                        return true;
                    } else {
                        setIsGenerateWallet(false);
                        setError(true);
                        return false;
                    }


                } catch (error) {
                    console.log('Connection error:', error);
                    setIsGenerateWallet(false);
                    setError(true);
                    return false;
                }
            })
            connectWallet();
        }
    }, [signature]);

    useEffect(() => {
        if (error && !isGenerateWallet) {
           // navigate(`/${lang}/home`);
            setAlert("Error generating wallet", "error");
        }
    }, [error, isGenerateWallet]);

    useEffect(() => {
        if (isGenerateWallet && !error) {
            setAlert("Generated wallet", "success");
        }
    }, [isGenerateWallet, error]);

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
