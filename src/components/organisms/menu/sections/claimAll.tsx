import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import { client, chain, modalConfig } from "hooks/thirdwebConfig";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { getClaims } from "reduxConfig/thunks/claim";
import { useSelector } from "react-redux";

import { useActiveAccount, useConnectModal } from "thirdweb/react";

import styled from "../styled.module.scss";
import { useTranslation } from "react-i18next";
import Alert from "components/molecules/alert";

const RewardButton = ({ reward, setOnError }: any) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const accountLS = JSON.parse(localStorage.getItem("session.account") || "{}");
  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();

  const getReward = async (reward: any) => {
    setLoading(true);

    try {
      let loginAccount = null;
      if (!activeAccount) {
        const response = await connect({ ...modalConfig, size: "wide" });
        loginAccount = response.getAccount();

        if (loginAccount?.address !== accountLS?.address) {
          await response?.disconnect();
          throw new Error("the address do not match");
        }
      }

      if (!activeAccount && !loginAccount) {
        throw new Error("account not found");
      }

      const account = activeAccount || loginAccount;

      // @ts-ignore
      const contract = getContract({
        client,
        chain,
        address: reward.destination,
        abi: [
          { inputs: [], stateMutability: "nonpayable", type: "constructor" },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: "address", name: "previousAvatar", type: "address" },
              { indexed: true, internalType: "address", name: "newAvatar", type: "address" },
            ],
            name: "AvatarSet",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
            name: "Initialized",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
              { indexed: true, internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: "address", name: "previousTarget", type: "address" },
              { indexed: true, internalType: "address", name: "newTarget", type: "address" },
            ],
            name: "TargetSet",
            type: "event",
          },
          {
            inputs: [{ internalType: "address", name: "_asset", type: "address" }],
            name: "addAsset",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "assets",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "avatar",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "claimAllTokens",
            outputs: [{ internalType: "bool", name: "success", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_token", type: "address" },
              { internalType: "uint256", name: "tokenId", type: "uint256" },
            ],
            name: "claimNft",
            outputs: [{ internalType: "bool", name: "success", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "_token", type: "address" }],
            name: "claimToken",
            outputs: [{ internalType: "bool", name: "success", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "_asset", type: "address" }],
            name: "removeAsset",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "_avatar", type: "address" }],
            name: "setAvatar",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "_target", type: "address" }],
            name: "setTarget",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "bytes", name: "initializeParams", type: "bytes" }],
            name: "setUp",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "target",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      });

      // @ts-ignore
      const transaction = prepareContractCall({
        contract,
        // @ts-ignore
        method: "function claimNft(address _token, uint256 tokenId)",
        params: [account?.address, 6],
      });

      if (!account) return;
      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      console.log("transactionHash: ", transactionHash);
    } catch (error: any) {
      setOnError({ show: true, msg: error?.message || "error to claim item" });
      console.error(error);
    }
    
    setLoading(false);
  };

  return (
    <Button onClick={() => getReward(reward)} isLoading={loading} disabled={loading}>
      {t("go").toUpperCase()}
    </Button>
  );
};

const MainTable = ({ data, setOnError }: any) => {
  return (
    <TableContainer className={styled.table}>
      <Table>
        <TableBody>
          {data?.map((item: any, pos: number) => (
            <TableRow key={pos} className={styled.earnRow}>
              <TableCell align="left">
                {item?.rewardName || item?.rewardText || item?.rewardType}
              </TableCell>
              <TableCell align="right">
                <RewardButton reward={item} setOnError={setOnError} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ClaimAll = ({ setOpenClaimAll }: any) => {
  const { t } = useTranslation();
  const [onError, setOnError] = useState({ show: false, msg: "" });

  const [value, setValue] = useState("1");
  const handleChange = (evt: any, newValue: string) => setValue(newValue);

  // redux data ---
  const claims = useSelector(getClaims);
  const rewardNFTs = claims?.filter((claim: any) => claim.rewardType === "NFTs");
  const rewardTokens = claims?.filter((claim: any) => claim.rewardType !== "NFTs");

  return (
    <>
      <Grid container flexDirection="column" className={styled.main}>
        <Box className={styled.header}>
          <Button onClick={() => setOpenClaimAll(false)}>
            <ArrowBackIcon /> {t("back")}
          </Button>
          <Typography pb={2} className={styled.title}>
            {t("claim-all").toUpperCase()}
          </Typography>
        </Box>
        <Box p={2} px={3} className={styled.container}>
          <Box className={styled.earnPointsContainer}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "#7A57A5" }}>
                <TabList
                  onChange={handleChange}
                  textColor="inherit"
                  variant="fullWidth"
                  indicatorColor="secondary"
                >
                  <Tab label="NFTs" value="1" />
                  <Tab label="Tokens" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ padding: "1rem 0", overflow: "auto" }}>
                <MainTable data={rewardNFTs} setOnError={setOnError} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: "1rem 0", overflow: "auto" }}>
                <MainTable data={rewardTokens} setOnError={setOnError} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Grid>

      {onError.show && (
        <Alert onClose={() => setOnError({ show: false, msg: "" })}>{onError.msg || "Error"}</Alert>
      )}
    </>
  );
};

export default ClaimAll;
