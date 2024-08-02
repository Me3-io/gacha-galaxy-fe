import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import { client, chain } from "hooks/thirdwebConfig";
import { getContract } from "thirdweb";


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

import styled from "../styled.module.scss";
import { useTranslation } from "react-i18next";

const MainTable = ({ data, handleClick }: any) => {
  const { t } = useTranslation();

  return (
    <TableContainer className={styled.table}>
      <Table>
        <TableBody>
          {data?.map((row: any, pos: number) => (
            <TableRow key={pos} className={styled.earnRow}>
              <TableCell align="left">
                {row?.rewardName || row?.rewardText || row?.rewardType}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleClick(row)}>{t("go").toUpperCase()}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ClaimAll = ({ setOpenClaimAll }: any) => {
  const [value, setValue] = useState("1");
  const handleChange = (evt: any, newValue: string) => setValue(newValue);
  const { t } = useTranslation();

  const claims = useSelector(getClaims);

  const rewardNFTs = claims?.filter((claim: any) => claim.rewardType === "NFTs");
  const rewardTokens = claims?.filter((claim: any) => claim.rewardType !== "NFTs");

  const getReward = async (reward: any) => {

    // @ts-ignore
    const myContract = getContract({
      client,
      chain,
      address: reward.destination,
      // optional ABI
      //abi: [...],
    });

    console.log(myContract);
  
  };

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
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
              <MainTable data={rewardNFTs} handleClick={getReward} />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "1rem 0", overflow: "auto" }}>
              <MainTable data={rewardTokens} handleClick={getReward} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Grid>
  );
};
export default ClaimAll;
