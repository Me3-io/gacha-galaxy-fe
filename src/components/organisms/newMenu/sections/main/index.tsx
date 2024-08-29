import { useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import Button from "components/atoms/buttons/base";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import { getClaims } from "reduxConfig/thunks/claim";

import keyIcon from "assets/icons/key.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import styled from "./styled.module.scss";
import Settings from "../settings";
import Leaderboard from "../leaderboard";

const Main = ({ setOpenPoints, setOpenTokens, setOpenRewards }: any) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const leaderboardData = useSelector(getLeaderboard);
  const claimeables = useSelector(getClaims)?.claimeables || [];

  const handleTab = (newValue: string) => {
    setValue(value === newValue ? "" : newValue);
  };

  return (
    <Box className={styled.main}>
      {/* user points and keys */}
      <Box className={styled.row} px={2} py={1}>
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
            <Button onClick={() => setOpenTokens(true)} disabled>
              {t("get-keys")} <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* rewards */}
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

      {/* tabs */}
      <Box className={styled.row} flexDirection={"column"} overflow={"auto"}>
        <TabContext value={value}>
          <Box className={styled.tabs}>
            <TabList
              textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{ style: { display: "none" } }}
            >
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("1")}
                label="Leaderboard"
                value="1"
              />
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("2")}
                label="Maps Regions"
                value="2"
              />
              <Tab
                sx={{ "&.Mui-selected": { backgroundColor: "#634373aa" } }}
                onClick={() => handleTab("3")}
                label="Settings"
                value="3"
              />
            </TabList>
          </Box>
          <Box className={styled.tabPanel}>
            <TabPanel value="1">
              <Leaderboard />
            </TabPanel>
            <TabPanel value="2">
              <Box p={2}>list maps</Box>
            </TabPanel>
            <TabPanel value="3">
              <Settings />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};
export default Main;
