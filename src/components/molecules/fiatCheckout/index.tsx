import { Box } from "@mui/material";
import { client, onlyWalletConfig } from "config/thirdwebConfig";
import { PayEmbed, useActiveAccount, useConnectModal } from "thirdweb/react";
import Button from "components/atoms/buttons/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styled from "./styled.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import useAlert from "hooks/alertProvider/useAlert";

const FiatCheckout = ({ setOpen }: any) => {
  const account = useActiveAccount();
  const data = useSelector(getLeaderboard);
  const { connect } = useConnectModal();
  const { setAlert } = useAlert();

  const walletActive = data?.wallets.find((w: any) => w?.active && w.type === "me3-created") || [];
  const [sameWallet, setSameWallet] = useState<boolean>(false);

  const valideActiveAddress = async () => {
    try {
      if (!account || account?.address.toLowerCase() !== walletActive?.address.toLowerCase()) {
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
    console.log(sameWallet);
    valideActiveAddress();
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
          connectOptions={{
            connectModal: {
              ...onlyWalletConfig,
            },
          }}
          payOptions={
            {
              //buyWithCrypto: false,
            }
          }
        />
      )}
    </Box>
  );
};
export default FiatCheckout;
