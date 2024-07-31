import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import styled from "../styled.module.scss";

const rows = [
  { name: "Claim NFT 1" },
  { name: "Claim NFT 2" },
  { name: "Claim NFT 3" },
  { name: "Claim NFT 4" },
  { name: "Claim NFT 5" },
];

const rows2 = [
  { name: "Claim Token 1" },
  { name: "Claim Token 2" },
  { name: "Claim Token 3" },
  { name: "Claim Token 4" },
  { name: "Claim Token 5" },  
];

const MainTable = ({ data, handleClick }: any) => (
  <TableContainer className={styled.table}>
    <Table>
      <TableBody>
        {data.map((row: any, pos: number) => (
          <TableRow key={pos} className={styled.earnRow}>
            <TableCell align="left">{row?.name || "- no name -"}</TableCell>
            <TableCell align="right">
              <Button onClick={() => handleClick(row)}>GO</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ClaimAll = ({ setOpenClaimAll }: any) => {
  const [value, setValue] = useState("1");
  const handleChange = (evt: any, newValue: string) => setValue(newValue);

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenClaimAll(false)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography pb={2} className={styled.title}>
          CLAIM ALL
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
            <TabPanel value="1" sx={{ padding: "1rem 0", overflow: "hidden" }}>
              <MainTable data={rows} handleClick={() => {}} />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "1rem 0", textAlign: "center" }}>
              <MainTable data={rows2} handleClick={() => {}} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Grid>
  );
};
export default ClaimAll;
