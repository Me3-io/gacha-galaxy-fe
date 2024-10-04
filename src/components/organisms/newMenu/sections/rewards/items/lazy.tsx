import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Button from "components/atoms/buttons/base";
import TableCell from "@mui/material/TableCell";
import defaultIcon from "assets/logo.svg";

import { client, chain, onlyWalletConfig } from "config/thirdwebConfig";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useConnectModal, useSwitchActiveWalletChain } from "thirdweb/react";
import { sepolia, bsc, ethereum, polygon, base } from "thirdweb/chains";

import { fetchClaims, getClaims } from "reduxConfig/thunks/claim";
import { useDispatch, useSelector } from "react-redux";

import customAxios from "utils/customAxios";
import useAlert from "hooks/alertProvider/useAlert";
import { format } from "date-fns";

import styled from "./styled.module.scss";

const RewardLazy = ({ item, walletActive, isCrytoUser }: any) => {
  const [loading, setLoading] = useState(false);
  const { lazyContractAddress, lazyContractABI } = useSelector(getClaims) || {};

  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const dispatch = useDispatch();
  const { setAlert } = useAlert();

  const rewardImage = item?.rewardImage ? item?.rewardImage[0]?.url : null;

  const contract = getContract({
    client,
    chain,
    address: lazyContractAddress,
    abi: lazyContractABI as any,
  });

  const setClaimed = async (accountingId: any, tx: any) => {
    await customAxios()
      .post("/user/setclaimed", {
        accountingId,
        tx,
      })
      .then(() => {
        setAlert(`Claim successfully - Transaction Hash: ${tx}`, "success");
        dispatch(fetchClaims() as any);
      })
      .catch((error: any) => {
        setAlert(error?.response?.data?.message || error?.message || "error", "error");
      });
  };

  const getChallenge = async (accountingId: any) => {
    const response = await customAxios()
      .post("/challenge/generatechallenge", {
        accountingId,
      })
      .then((response) => {
        return response?.data?.message || {};
      })
      .catch((error: any) => {
        console.error("Error to challenge: ", error);
      });
    return response;
  };

  const switchRewardChain = async (rewardNetwork: any) => {
    let chain = bsc;
    if (rewardNetwork === "Sepolia") {
      chain = sepolia;
    }
    if (rewardNetwork === "Ethereum") {
      chain = ethereum;
    }
    if (rewardNetwork === "Poligon") {
      chain = polygon;
    }
    if (rewardNetwork === "Base") {
      chain = base;
    }
    await switchChain(chain);
  };

  const getReward = async (reward: any) => {
    console.log("Reward Lazy: ", reward);

    setLoading(true);
    try {
      let loginAccount = null;
      if (!activeAccount || activeAccount?.address?.toLowerCase() !== walletActive?.address?.toLowerCase()) {
        const response = await connect({
          ...onlyWalletConfig,
          size: "compact",
          title: `Login to wallet ${walletActive?.address?.slice(0, 6)}...${walletActive?.address?.slice(-6)}`,
        });

        loginAccount = response.getAccount();

        if (loginAccount?.address.toLowerCase() !== walletActive?.address.toLowerCase()) {
          await response?.disconnect();
          throw new Error("the address do not match");
        }
      }

      const account = activeAccount || loginAccount;
      if (!account) {
        throw new Error("account not found");
      }

      if (reward?.rewardNetwork) {
        await switchRewardChain(reward?.rewardNetwork);
      }

      const challengeReward = await getChallenge(reward?.accountingId);
      if (!challengeReward) {
        throw new Error("Failed to get challenge reward");
      }

      const { buyer, recordId, quantity, tokenId, signature } = challengeReward;

      const transaction = prepareContractCall({
        contract,
        method: "function mint((address buyer, string recordId, uint8 quantity, string tokenId, bytes signature))",
        params: [
          {
            buyer,
            recordId,
            quantity,
            tokenId,
            signature,
          },
        ],
        maxFeePerGas: 60n,
        maxPriorityFeePerGas: 1n,
        gas: 1000000n,
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      console.log("Transaction Hash: ", transactionHash);
      if (transactionHash) {
        await setClaimed(reward?.accountingId, transactionHash);
      }
    } catch (error: any) {
      if (error?.message) setAlert(error?.message, "error");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Box className={styled.item}>
      <TableCell align="left">
        <img src={rewardImage || defaultIcon} alt={"reward"} loading="lazy" />
        <Box>
          <Typography>{item?.rewardName || item?.rewardText || item?.rewardType}</Typography>
          <Typography className={styled.status}>
            <span>{format(item?.date, "d MMMM yy - HH:mm")}</span>
          </Typography>
          {/*<Typography className={styled.type}>{item?.rewardType}</Typography>*/}
        </Box>
      </TableCell>
      <TableCell align="right">
        {isCrytoUser && (
          <Button onClick={() => getReward(item)} isLoading={loading} disabled={loading}>
            {item?.customButtonText.toUpperCase() || "CLAIM"}
          </Button>
        )}
      </TableCell>
    </Box>
  );
};
export default RewardLazy;
