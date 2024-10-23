import { Suspense, useEffect, useState } from "react";
import { chain, client, onlyWalletConfig } from "config/thirdwebConfig";
import { useQuery } from "@tanstack/react-query";
import { useConnect } from "thirdweb/react";
import { Box, Container } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { inAppWallet } from "thirdweb/wallets";
import Layout from "components/templates/layout";
import styled from "../styled.module.scss";
import { createThirdwebClient } from "thirdweb";
const wallet = inAppWallet({
    smartAccount: {
        sponsorGas: true,
        chain: chain
    }
});

const TelegramLogin = () => {
    const { connect } = useConnect();
    const { signature, message } = useParams();
    const [params, setParams] = useState({ signature: '', message: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [isGenerateWallet, setIsGenerateWallet] = useState(false);

    useEffect(() => {
        setParams({ signature: signature as string, message: message as string });
        console.log('SearchParams:', { signature, message });
    }, [signature, message]);

    useQuery({
        queryKey: ["telegram-login", params.signature, params.message],
        queryFn: async () => {
            if (!params.signature || !params.message) {
                console.error('Missing signature or message');
                return false;
            }
            try {
                const walletOrFn = await connect(async () => {
                    try {
                        const client = createThirdwebClient({
                            clientId: '5c2008dc15fde34d454e47b09661e39d',
                        });
                        await wallet.connect({
                            client,
                            strategy: "auth_endpoint",
                            payload: JSON.stringify({
                                signature: params.signature,
                                message: params.message,
                            }),
                            encryptionKey: '00000000000',
                        });
                        console.log('Connection wallet:', wallet);
                        return wallet;
                    } catch (error) {
                        console.error('Connection error:', error);
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
                console.error('Connection error:', error);
                setIsGenerateWallet(false);
                setError(true);
                return false;
            }
        },
        enabled: !!params.signature && !!params.message,
    });
    return (
        <Layout>
            <Container maxWidth={false} disableGutters={true}>
                <Box className={styled.main}>
                    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center" style={{color: "aliceblue"}}>
                        {!error && !isGenerateWallet && (<div>Generating Wallet...</div>)}
                        {error && !isGenerateWallet && (<div>Error Generating Wallet</div>)}
                        {!error && isGenerateWallet && (<div>Generated Wallet</div>)}
                    </div>
                </Box>
            </Container>
        </Layout>

    );
}

export default TelegramLogin;