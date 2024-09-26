import { useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import Button from "components/atoms/buttons/base";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import { getClaims } from "reduxConfig/thunks/claim";

import keyIcon from "assets/icons/key.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import menuIcon from "assets/icons/menu.svg";
import leaderboardIcon from "assets/icons/leaderboard.svg";
import mapIcon from "assets/icons/map.svg";
import notificationsIcon from "assets/icons/notifications.svg";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// sections ---
import ListMaps from "./maps";
import Leaderboard from "./leaderboard";
import Menu from "./menu";
import Notifications from "./notifications";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";

const Main = ({ setOpenPoints, setOpenTokens, setOpenRewards, goToMap }: any) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("1");

  const leaderboardData = useSelector(getLeaderboard);
  const claimeables = useSelector(getClaims)?.claimeables || [];

  const handleTab = (newValue: string) => {
    setValue(value === newValue ? "0" : newValue);
  };

  return (
    <Box className={styled.main}>
      {/* user points and keys */}
      <Box className={`${styled.row} points-step`} px={2} py={1}>
        <Box className={styled.item} pr={2}>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <span>{t("points")}</span>
              <Typography className={styled.position}>#{leaderboardData?.userPosition || "-"}</Typography>
            </Box>
            <Typography>{leaderboardData?.userPoints?.toFixed(0) || "0"}</Typography>
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
            <Button onClick={() => setOpenTokens((prev: boolean) => !prev)}>
              {t("get-keys")} <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* rewards */}
      {claimeables?.length > 0 && (
        <Box className={styled.row} px={2} sx={{ background: "#180924b3" }}>
          <Box className={styled.item}>
            <Box className={styled.rewards}>
              {/*<Typography className={styled.infoLabel}>{t("new-rewards")}</Typography>*/}
              <Box>
                <Typography>{claimeables?.length || 0}</Typography>
                <span dangerouslySetInnerHTML={{ __html: t("rewards-availables") }}></span>
              </Box>
            </Box>
          </Box>
          <Box className={styled.item}>
            <Box className={styled.action} px={2}>
              <Button onClick={() => setOpenRewards(true)}>
                {t("rewards")} <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* tabs */}
      <Box className={styled.row} flexDirection={"column"} overflow={"auto"}>
        <TabContext value={value}>
          <Box className={styled.tabs}>
            <TabList
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              TabIndicatorProps={{ style: { display: "none" } }}
            >
              <Tab value="0" className={styled.hiddenTab} />
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("1")}
                title="Maps Regions"
                icon={<img src={mapIcon} alt="menu" height={24} />}
                value="1"
                className="maps-step"
              />
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("2")}
                title="Leaderboard"
                value="2"
                icon={<img src={leaderboardIcon} alt="menu" height={22} />}
                className="leaderboard-step"
              />
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("3")}
                title="Menu"
                icon={<img src={menuIcon} alt="menu" height={16} />}
                value="3"
              />
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("4")}
                title="Notifications"
                icon={<img src={notificationsIcon} alt="menu" height={22} />}
                value="4"
              />
            </TabList>
          </Box>
          <Box className={styled.tabPanel}>
            <TabPanel value="1">
              <ListMaps goToMap={goToMap} />
            </TabPanel>
            <TabPanel value="2">
              <Leaderboard />
            </TabPanel>
            <TabPanel value="3">
              <Menu />
            </TabPanel>
            <TabPanel value="4">
              <Notifications />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};
export default Main;
