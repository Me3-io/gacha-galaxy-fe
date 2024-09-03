import { Box, Fade, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import user from "assets/icons/user.svg";
import arrowUp from "assets/icons/arrowUp.svg";
import arrowDown from "assets/icons/arrowDown.svg";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";

const Leaderboard = () => {
  const { t } = useTranslation();
  const leaderboardData = useSelector(getLeaderboard);

  return (
    <Grid container component="section" flexDirection="column" className={styled.main}>
      <Fade in={true} timeout={500}>
        <Box p={1} className={styled.container} >
          <Box className={styled.listData}>
            <Box className={styled.border}></Box>
            <TableContainer className={styled.table}>
              <Table>
                <tbody>
                  {leaderboardData?.ranking ? (
                    leaderboardData.ranking?.map((row: any) => (
                      <TableRow key={row.userId}>
                        <TableCell className={styled.user} width={"60%"}>
                          <img src={user} alt="user" />
                          <span>{row.position}</span>
                          <Typography>{row.nickname}</Typography>
                        </TableCell>
                        <TableCell align="right" width={"5%"} className={styled.arrow}>
                          <img src={row.isUp ? arrowUp : arrowDown} alt="arrow" />
                        </TableCell>
                        <TableCell align="right" width={"35%"} sx={{ paddingLeft: "0!important" }}>
                          {row?.points?.toFixed(2) || 0} pts
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
                </tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Fade>
    </Grid>
  );
};
export default Leaderboard;
