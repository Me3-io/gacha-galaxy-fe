import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Button from "components/atoms/buttons/base";
import TableCell from "@mui/material/TableCell";

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

const RewardNFTs = ({ item, isCrytoUser }: any) => {
  const [loading, setLoading] = useState(false);
  const { claimContractABI, claimContractAddress } = useSelector(getClaims) || {};

  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const dispatch = useDispatch();
  const { setAlert } = useAlert();

  const contract = getContract({
    client,
    chain,
    address: claimContractAddress,
    abi: claimContractABI as any,
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
    console.log("Reward Nfts: ", reward);
    setLoading(true);

    try {
      let loginAccount = null;
      if (!activeAccount || activeAccount?.address.toLowerCase() !== reward?.destination.toLowerCase()) {
        const response = await connect({
          ...onlyWalletConfig,
          size: "compact",
          title: `Login to wallet ${reward?.destination?.slice(0, 6)}...${reward?.destination?.slice(-6)}`,
        });
        loginAccount = response.getAccount();

        if (loginAccount?.address.toLowerCase() !== reward?.destination.toLowerCase()) {
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

      const transaction = prepareContractCall({
        contract,
        method: "function claimNft(address _token, uint256 tokenId)",
        params: [reward?.rewardContractAddress, reward?.rewardTokenId],
        maxFeePerGas: 60n,
        maxPriorityFeePerGas: 1n,
        gas: 400000n,
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
        <Typography>{item?.rewardName || item?.rewardText || item?.rewardType}</Typography>
        <Typography className={styled.status}>
          {item?.rewardStatePending ? "Pending" : "Approved"} <span>{format(item?.date, "d MMMM yy - HH:mm")}</span>
        </Typography>
        <Typography className={styled.type}>{item?.rewardType}</Typography>
      </TableCell>
      <TableCell align="right">
        {isCrytoUser && (
          <Button onClick={() => getReward(item)} isLoading={loading} disabled={loading || item?.rewardStatePending}>
            {item?.rewardStatePending ? "PENDING" : item?.customButtonText.toUpperCase() || "CLAIM"}
          </Button>
        )}
      </TableCell>
    </Box>
  );
};

export default RewardNFTs;
