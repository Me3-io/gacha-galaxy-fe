import { Box, Grid, Typography } from "@mui/material";
import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

// icons ---
import keyIcon from "assets/icons/key.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import { getClaims } from "reduxConfig/thunks/claim";

import { useTranslation } from "react-i18next";
import styled from "../styled.module.scss";

const Main = ({ setOpenPoints, setOpenTokens, setOpenClaimAll, opacity }: any) => {
  const { t } = useTranslation();

  const leaderboardData = useSelector(getLeaderboard);
  const claimeables = useSelector(getClaims)?.claimeables || [];

  return (
    <Grid container component="section" flexDirection="column" className={styled.main} sx={{ opacity: opacity }}>
      <Box px={4} py={2} className={`${styled.row} points-step`}>
        <Box className={styled.item} pr={2}>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <span>{t("points")}</span>
              <Typography className={styled.position}>#{leaderboardData?.userPosition || "-"}</Typography>
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
      <Box p={2} className={styled.row} sx={{ borderTop: "2px solid #ba00fb" }}>
        <Box className={styled.item} px={2}>
          <Box className={styled.rewards}>
            <Typography className={styled.infoLabel}>{t("new-rewards")}</Typography>
            <Box>
              <Typography>{claimeables?.length || 0}</Typography>
              <span dangerouslySetInnerHTML={{ __html: t("rewards-availables") }}></span>
            </Box>
          </Box>
        </Box>
        <Box className={styled.item} p={2}>
          <Box className={styled.claimBtn}>
            <ButtonDefault onClick={() => setOpenClaimAll(true)}>
              {t("claim-all").toUpperCase()} <ArrowForwardIcon />
            </ButtonDefault>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Main;
