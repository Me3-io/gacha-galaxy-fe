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

const FiatCheckout = ({ setOpen }: any) => {
  const account = useActiveAccount();
  const data = useSelector(getLeaderboard);
  const { connect } = useConnectModal();
  const { setAlert } = useAlert();

  const walletActive = data?.wallets.find((w: any) => w?.active && !w.social) || null;
  const [sameWallet, setSameWallet] = useState<boolean>(false);

  const testMode = process.env.REACT_APP_NODE_ENV === "development";

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
          connectOptions={{
            connectModal: {
              ...onlyWalletConfig,
            },
            chain,
          }}
          payOptions={{
            buyWithFiat: {
              testMode,
            },
            buyWithCrypto: {
              testMode,
            },
          }}
        />
      )}
    </Box>
  );
};
export default FiatCheckout;
