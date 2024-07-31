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

import { useSelector } from "react-redux";
import { getBuildings } from "reduxConfig/thunks/buildings";

import styled from "../styled.module.scss";

const MainTable = ({ data, handleClick }: any) => (
  <TableContainer className={styled.table}>
    <Table>
      <TableBody>
        {data.length > 0 ? (
          data.map((row: any, pos: number) => (
            <TableRow key={pos} className={styled.earnRow}>
              <TableCell align="left">{row?.name || "- no name -"}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleClick(row)}>GO</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell align="center" colSpan={3}>
              no data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const EarnPoints = ({ setOpenPoints, setGames, setCampaing }: any) => {
  const [value, setValue] = useState("1");
  const handleChange = (evt: any, newValue: string) => setValue(newValue);
  const buildingsData = useSelector(getBuildings) || [];

  // filter Games data ---
  const games = buildingsData.filter((item: any) => item?.games);

  // filter Campaigns data ---
  let auxCampaing: { [key: string]: boolean } = {};
  const campaigns = buildingsData
    .filter((item: any) => item?.campaign)
    .map((item: any) => ({ ...item.campaign }))
    .filter((item: any) => (auxCampaing[item._id] ? false : (auxCampaing[item._id] = true))); // elimino repetidos

  // events ---
  const handlerGameClick = (row: any) => {
    setGames({ open: true, data: row.games || [] });
  };

  const handlerCampaingClick = (row: any) => {
    setCampaing({ open: true, id: row.claimrId || "" });
  };

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenPoints(false)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography pb={2} className={styled.title}>
          EARN POINTS
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
                <Tab label="CLAIMR CAMPAIGNS" value="1" />
                <Tab label="ALL GAMES" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "1rem 0", overflow: "hidden" }}>
              <MainTable data={campaigns} handleClick={handlerCampaingClick} />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "1rem 0", overflow: "hidden" }}>
              <MainTable data={games} handleClick={handlerGameClick} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Grid>
  );
};
export default EarnPoints;
