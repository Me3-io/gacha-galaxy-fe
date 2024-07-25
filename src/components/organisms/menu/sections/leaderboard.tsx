import { Box, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// icons ---
import menu from "assets/icons/menu.svg";
import user from "assets/icons/user.svg";
import arrowUp from "assets/icons/arrowUp.svg";
import arrowDown from "assets/icons/arrowDown.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import keyIcon from "assets/icons/key.svg";
import Button from "components/atoms/buttons/base";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import { useTranslation } from "react-i18next";
import styled from "../styled.module.scss";

const Leaderboard = ({
  showBack,
  goToMap,
  setOpenPoints,
  setOpenTokens,
  setOpenMenu,
  opacity,
}: any) => {
  const { t } = useTranslation();
  const leaderboardData = useSelector(getLeaderboard);

  return (
    <Grid
      container
      component="section"
      flexDirection="column"
      className={styled.main}
      sx={{ opacity: opacity }}
    >
      <Box p={2} className={styled.header}>
        <Box component="span" onClick={() => setOpenMenu(true)}>
          <img src={menu} alt="menu" width={36} />
        </Box>
        <Box className={styled.nickname} display={{ xs: "none", md: "flex" }}>
          <Typography>{leaderboardData?.userNickname}</Typography>
          <AccountCircleIcon />
        </Box>
        <Typography className={styled.title} display={{ xs: "flex", md: "none" }}>
          {t("leaderboard").toUpperCase()}
        </Typography>
        {showBack && (
          <Box className={styled.upIcon} onClick={goToMap}>
            <span>{t("map")}</span>
            <UpIcon />
          </Box>
        )}
      </Box>

      <Box p={2} pt={0} className={styled.container}>
        <Typography pb={1} className={styled.title} display={{ xs: "none", md: "inline-block" }}>
          {t("leaderboard").toUpperCase()}
        </Typography>
        <Box className={styled.listData}>
          <Box className={styled.border}></Box>
          <TableContainer className={styled.table}>
            <Table>
              <TableBody>
                {leaderboardData?.ranking.map((row: any) => (
                  <TableRow key={row.userId}>
                    <TableCell className={styled.user} component="th" scope="row">
                      <img src={user} alt="user" />
                      <span>{row.position}</span>
                      {row.nickname}
                    </TableCell>
                    <TableCell align="right">
                      <img src={row.isUp ? arrowUp : arrowDown} alt="arrow" />
                    </TableCell>
                    <TableCell align="right">{row.points.toFixed(2)} pts</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box px={4} py={2} className={styled.footer}>
        <Box className={styled.item} pr={2}>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <span>{t("points")}</span>
              <Typography className={styled.position}>
                #{leaderboardData?.userPosition || "-"}
              </Typography>
            </Box>
            <Typography>{leaderboardData?.userPoints.toFixed(2) || "-"}</Typography>
          </Box>

          <Box className={styled.action}>
            <Button onClick={() => setOpenPoints(true)}>
              {t("earn-points")} <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>

        <Box className={styled.item} pl={2}>
          <Box>
            <span>{t("keys")}</span>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <img src={keyIcon} alt="key" height={"28px"} />
              <Typography>{leaderboardData?.userKeys || "-"}</Typography>
            </Box>
          </Box>
          <Box className={styled.action}>
            <Button onClick={() => setOpenTokens(true)} disabled>
              {t("get-keys")} <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Leaderboard;
