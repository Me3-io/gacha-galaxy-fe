import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";
import WalletIcon from "@mui/icons-material/Wallet";

import { client, chain, onlyWalletConfig } from "config/thirdwebConfig";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useConnectModal, useSwitchActiveWalletChain } from "thirdweb/react";
import { sepolia, bsc, ethereum, polygon, base } from "thirdweb/chains";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { fetchClaims, getClaims } from "reduxConfig/thunks/claim";
import { useDispatch, useSelector } from "react-redux";

import customAxios from "utils/customAxios";
import { format } from "date-fns";
import useAlert from "hooks/alertProvider/useAlert";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

const RewardButton = ({ reward, walletActive }: any) => {
  const [loading, setLoading] = useState(false);
  const { claimContractABI, claimContractAddress, lazyContractAddress, lazyContractABI } = useSelector(getClaims) || {};

  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const dispatch = useDispatch();

  const { setAlert } = useAlert();

  const contractLazy = getContract({
    client,
    chain,
    address: lazyContractAddress,
    abi: lazyContractABI as any,
  });

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
    console.log("Reward: ", reward);

    if (reward?.rewardType === "NFTs") {
      await getRewardNFT(reward);
    }

    if (reward?.rewardType === "Lazy") {
      await getRewardLazy(reward);
    }
  };

  const getRewardNFT = async (reward: any) => {
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
      setAlert(error?.message || "error to claim item", "error");
      console.error(error);
    }

    setLoading(false);
  };

  const getRewardLazy = async (reward: any) => {
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
        contract: contractLazy,
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
      setAlert(error?.message || "error to claim item", "error");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={() => getReward(reward)}
      isLoading={loading}
      disabled={loading || (reward?.rewardStatePending && reward?.rewardType !== "Lazy")}
    >
      {reward?.rewardStatePending && reward?.rewardType !== "Lazy"
        ? "PENDING"
        : reward?.customButtonText.toUpperCase() || "CLAIM"}
    </Button>
  );
};

const MainTable = ({ data, walletActive, isCrytoUser }: any) => {
  const { setAlert } = useAlert();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code || "");
    setAlert("Copy code to clipboard", "success");
  };

  return (
    <TableContainer className={styled.table}>
      <Table>
        <TableBody>
          {data.length > 0 ? (
            data?.map((item: any, pos: number) => (
              <TableRow key={pos} className={styled.earnRow}>
                <TableCell align="left">
                  <Typography>{item?.rewardName || item?.rewardText || item?.rewardType}</Typography>
                  <Typography className={styled.status}>
                    {item?.rewardStatePending ? "Pending" : "Approved"}{" "}
                    <span>({format(item?.date, "d MMMM yy - HH:mm")})</span>
                  </Typography>
                  <Typography className={styled.type}>{item?.rewardType}</Typography>
                </TableCell>
                <TableCell align="right">
                  {isCrytoUser && item?.rewardType !== "Codes" && (
                    <RewardButton reward={item} walletActive={walletActive} />
                  )}

                  {item?.rewardType === "Codes" && (
                    <Button onClick={() => handleCopy(item?.copyText || item?.rewardText)}>
                      {item?.customButtonText.toUpperCase() || "Copy Code"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <Box px={3}>
              <span>no rewards available</span>
            </Box>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Rewards = ({ setOpen, setOpenCheckout }: any) => {
  const { t } = useTranslation();
  const claimeables = useSelector(getClaims)?.claimeables || [];
  const leaderboard = useSelector(getLeaderboard);

  const walletActive = leaderboard?.wallets.find((w: any) => w?.active && !w.social) || {};
  const isCrytoUser = walletActive?.type !== "me3-created" ? true : false;

  return (
    <>
      <Grid container flexDirection="column" className={styled.main} pb={2}>
        <Box className={styled.header}>
          <Box display={"flex"} gap={"1rem"}>
            <Button onClick={() => setOpen(false)}>
              <ArrowBackIcon /> {t("back")}
            </Button>
            {isCrytoUser && (
              <Button onClick={() => setOpenCheckout(true)}>
                <WalletIcon /> Buy Gas
              </Button>
            )}
          </Box>
          <Typography pb={2} className={styled.title}>
            {t("rewards").toUpperCase()}
          </Typography>
        </Box>
        <Box className={styled.container}>
          <MainTable data={claimeables} walletActive={walletActive} isCrytoUser={isCrytoUser} />
        </Box>
      </Grid>
    </>
  );
};

export default Rewards;
