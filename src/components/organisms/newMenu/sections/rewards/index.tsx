import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import { client, chain, onlyWalletConfig } from "config/thirdwebConfig";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";

//import Tab from "@mui/material/Tab";
//import TabContext from "@mui/lab/TabContext";
//import TabList from "@mui/lab/TabList";
//import TabPanel from "@mui/lab/TabPanel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { fetchClaims, getClaims } from "reduxConfig/thunks/claim";
import { useDispatch, useSelector } from "react-redux";

import { useActiveAccount, useConnectModal } from "thirdweb/react";

//import waitForElement from "utils/waitForElement";
import customAxios from "utils/customAxios";
import { format } from "date-fns";
import useAlert from "hooks/alertProvider/useAlert";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";

const RewardButton = ({ reward }: any) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { claimContractABI, claimContractAddress } = useSelector(getClaims) || {};

  //const accountLS = JSON.parse(localStorage.getItem("session.account") || "{}");
  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();
  const dispatch = useDispatch();

  const { setAlert } = useAlert();

  // @ts-ignore
  const contract = getContract({
    client,
    chain,
    address: claimContractAddress,
    abi: claimContractABI as any,
  });

  const getReward = async (reward: any) => {
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

      if (!activeAccount && !loginAccount) {
        throw new Error("account not found");
      }

      const account = activeAccount || loginAccount;

      //console.log("reward: ", reward);
      //console.log("account: ", account);
      //console.log("contract: ", contract);

      // @ts-ignore
      const transaction = prepareContractCall({
        contract,
        method: "function claimNft(address _token, uint256 tokenId)",
        params: [reward?.rewardContractAddress, reward?.rewardTokenId],
        maxFeePerGas: 60n,
        maxPriorityFeePerGas: 1n,
        gas: 400000n,
      });

      //console.log("_token: ", reward?.rewardContractAddress, "tokenId: ", reward?.rewardTokenId);

      if (!account) return;
      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      console.log("Transaction Hash: ", transactionHash);

      if (transactionHash) {
        await customAxios()
          .post("/user/setclaimed", {
            accountingId: reward.accountingId,
            tx: transactionHash,
          })
          .then(() => {
            setAlert(`Claim successfully - Transaction Hash: ${transactionHash}`, "success");
            dispatch(fetchClaims() as any);
          })
          .catch((error: any) => {
            setAlert(error?.response?.data?.message || error?.message || "error", "error");
          });
      }
    } catch (error: any) {
      setAlert(error?.message || "error to claim item", "error");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Button onClick={() => getReward(reward)} isLoading={loading} disabled={loading || reward?.rewardStatePending}>
      {t("go").toUpperCase()}
    </Button>
  );
};

const MainTable = ({ data }: any) => {
  return (
    <TableContainer className={styled.table}>
      <Table>
        <TableBody>
          {data?.map((item: any, pos: number) => (
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
                <RewardButton reward={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Rewards = ({ setOpen }: any) => {
  const { t } = useTranslation();

  //const [value, setValue] = useState("1");
  //const handleChange = (evt: any, newValue: string) => setValue(newValue);

  // redux data ---
  const claimeables = useSelector(getClaims)?.claimeables || [];
  //const rewardNFTs = claimeables?.filter((claim: any) => claim.rewardType === "NFTs");
  //const rewardTokens = claimeables?.filter((claim: any) => claim.rewardType !== "NFTs");

  return (
    <>
      <Grid container flexDirection="column" className={styled.main} pb={2}>
        <Box className={styled.header}>
          <Button onClick={() => setOpen(false)}>
            <ArrowBackIcon /> {t("back")}
          </Button>
          <Typography pb={2} className={styled.title}>
            {t("rewards").toUpperCase()}
          </Typography>
        </Box>
        <Box className={styled.container}>
          <MainTable data={claimeables} />

          {/*<TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "#7A57A5" }}>
              <TabList
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
                indicatorColor="secondary"
              >
                <Tab label="NFTs" value="1" />
                <Tab label="Tokens" value="2" disabled />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "1rem 0", overflow: "auto" }}>
              <MainTable data={rewardNFTs} />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "1rem 0", overflow: "auto" }}>
              <MainTable data={rewardTokens} />
            </TabPanel>
          </TabContext>*/}
        </Box>
      </Grid>
    </>
  );
};

export default Rewards;
