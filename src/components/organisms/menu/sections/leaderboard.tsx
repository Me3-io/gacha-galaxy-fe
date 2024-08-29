import { Box, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Button from "components/atoms/buttons/base";
import CustomTooltip from "components/atoms/materialTooltip";
import NFTChekout from "components/NFTChekout";

// icons ---
import menu from "assets/icons/menu.svg";
import user from "assets/icons/user.svg";
import arrowUp from "assets/icons/arrowUp.svg";
import arrowDown from "assets/icons/arrowDown.svg";
import keyIcon from "assets/icons/key.svg";
import UpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  openTokens,
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
     {openTokens && <NFTChekout />}
      <Box className={styled.header}>
        <CustomTooltip title={t("menu")}>
          <Box component="span" onClick={() => setOpenMenu(true)}>
            <img src={menu} alt="menu" width={36} />
          </Box>
        </CustomTooltip>
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

      <Box p={2} pt={0} className={`${styled.container} leaderboard-step`}>
        <Typography pb={1} className={styled.title} display={{ xs: "none", md: "inline-block" }}>
          {t("leaderboard").toUpperCase()}
        </Typography>
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

      <Box px={4} py={2} className={`${styled.footer} points-step`}>
        <Box className={styled.item} pr={2}>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <span>{t("points")}</span>
              <Typography className={styled.position}>
                #{leaderboardData?.userPosition || "-"}
              </Typography>
            </Box>
            <Typography>{leaderboardData?.userPoints?.toFixed(2) || "0"}</Typography>
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
              <Typography>{leaderboardData?.userKeys || "0"}</Typography>
            </Box>
          </Box>
          <Box className={styled.action}>
            <Button onClick={() => setOpenTokens(!openTokens)}>
              {t("get-keys")} <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Leaderboard;
