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
import { useTranslation } from "react-i18next";

const MainTable = ({ data, handleClick }: any) => {
  const { t } = useTranslation();
  return (
    <TableContainer className={styled.table}>
      <Table>
        <TableBody>
          {data.length > 0 ? (
            data.map((row: any, pos: number) => (
              <TableRow key={pos} className={styled.earnRow}>
                <TableCell align="left">{row?.name || "- no name -"}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleClick(row)}>{t("go").toUpperCase()}</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={3}>
                {t("no-data")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const EarnPoints = ({ setOpenPoints, setGames, setCampaing }: any) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("1");
  const handleChange = (evt: any, newValue: string) => setValue(newValue);
  const buildingsData = useSelector(getBuildings) || [];

  // filter Games data ---
  const games = buildingsData.filter((item: any) => item?.games);

  // filter Campaigns data ---
  let auxCampaings: { [key: string]: boolean } = {};
  const campaigns = buildingsData
    .filter((item: any) => item?.campaigns)
    .map((item: any) => ({ ...item.campaigns }))
    .filter((item: any) => (auxCampaings[item._id] ? false : (auxCampaings[item._id] = true))); // elimino repetidos

  //console.log("campaigns", campaigns);
  // events ---
  const handlerGameClick = (row: any) => {
    setGames({ open: true, data: row.games || [] });
  };

  const handlerCampaingClick = (row: any) => {
    setCampaing({ open: true, data: row || {} });
  };

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box className={styled.header}>
        <Button onClick={() => setOpenPoints(false)}>
          <ArrowBackIcon /> {t("back")}
        </Button>
        <Typography pb={2} className={styled.title}>
          {t("earn-points").toUpperCase()}
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
                <Tab label={t("claimr-campaigns")} value="1" />
                <Tab label={t("all-games")} value="2" />
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
