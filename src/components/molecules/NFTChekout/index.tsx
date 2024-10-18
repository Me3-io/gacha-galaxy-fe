import { Box } from "@mui/material";
import { chain, client, onlyWalletConfig } from "config/thirdwebConfig";
import { PayEmbed, useActiveAccount, useConnectModal } from "thirdweb/react";
import Button from "components/atoms/buttons/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styled from "./styled.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import useAlert from "hooks/alertProvider/useAlert";

import { getContract, prepareContractCall, prepareTransaction, toWei } from "thirdweb";
import keysABI from "abi/keysABI.json";
import { ethereum } from "thirdweb/chains";

const NFTCheckout = ({ setOpen }: any) => {
  const account = useActiveAccount();
  const data = useSelector(getLeaderboard);
  const { connect } = useConnectModal();
  const { setAlert } = useAlert();

  const walletActive = data?.wallets.find((w: any) => w?.active && !w.social) || null;
  const [sameWallet, setSameWallet] = useState<boolean>(false);

  const testMode = process.env.REACT_APP_NODE_ENV === "development";
  const sellerAddress = process.env.REACT_APP_SELLER_ADDRESS_DIRECT_PAYMENT as string;
  const nftContractAddress = process.env.REACT_APP_TRANSAK_KEYS_CONTRACT as string;
  const nameNFT = "KEY";
  const imageNFT = process.env.REACT_APP_ASSETS_URL + "/keys/image/basic.jpg";

  const valideActiveAddress = async () => {
    try {
      if (!account || account?.address?.toLowerCase() !== walletActive?.address?.toLowerCase()) {
        const response = await connect({
          ...onlyWalletConfig,
          size: "compact",
          title: `Login to wallet ${walletActive?.address?.slice(0, 6)}...${walletActive?.address?.slice(-6)}`,
        });

        const loginAccount = response.getAccount();

        if (loginAccount?.address.toLowerCase() !== walletActive?.address.toLowerCase()) {
          await response?.disconnect();
          throw new Error("the address do not match");
        } else {
          setSameWallet(true);
        }
      } else {
        setSameWallet(true);
      }
    } catch (error: any) {
      setAlert(error?.message, "error");
      console.error(error);
      setOpen(false);
    }
  };

  useEffect(() => {
    valideActiveAddress();
    console.log("testMode: ", testMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styled.payEmbed}>
      <Box className={styled.backButton}>
        <Button onClick={() => setOpen(false)}>
          <ArrowBackIcon /> back
        </Button>
      </Box>
      {sameWallet && (
        <PayEmbed
          client={client}
          theme={"dark"}
          payOptions={{
            mode: "direct_payment",
            buyWithFiat: { testMode: testMode },
            paymentInfo: {
              amount: "0.01", // purchase amount for your token
              chain: chain, // chain of the accepted token. Use optional "tokenInfo" field for non-native tokens.
              sellerAddress: sellerAddress,
            },
            // Purchase Data is added to the webhook response
            // Add information here that you intend to consume server-side
            purchaseData: {
              nftContractAddress: nftContractAddress,
              chainId: chain,
              metadata: {
                name: nameNFT,
                image: imageNFT,
                amount: "0.01",
              },
            },
            // Metadata is displayed on PayEmbed client
            metadata: {
              name: nameNFT,
              image: imageNFT,
            },
          }}
        />
      )}
    </Box>
  );
};
export default NFTCheckout;
