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
import { posix } from "path";

const rows = [
  { name: "Lorem ipsum campaign" },
  { name: "Lorem ipsum campaign" },
  { name: "Lorem ipsum campaign" },
  { name: "Lorem ipsum campaign" },
  { name: "Lorem ipsum campaign" },
];

const EarnPoints = ({ setOpenPoints }: any) => {
  const [value, setValue] = useState("1");

  const handleChange = (evt: any, newValue: string) => {
    setValue(newValue);
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
      <Box p={2} className={styled.container}>
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
          <TabPanel value="1" sx={{padding: "1rem 0"}}>
            <TableContainer>
              <Table>
                <TableBody>
                  {rows.map((row, pos) => (
                    <TableRow key={pos}>
                      <TableCell align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <Button>GO</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="2">all items</TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
export default EarnPoints;
