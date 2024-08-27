import { Box, Typography } from "@mui/material";
import Button from "components/atoms/buttons/base";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import { getClaims } from "reduxConfig/thunks/claim";

import keyIcon from "assets/icons/key.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styled from "./styled.module.scss";

const Main = ({ setOpenPoints, setOpenTokens, setOpenClaimAll }: any) => {
  const { t } = useTranslation();

  const leaderboardData = useSelector(getLeaderboard);
  const claimeables = useSelector(getClaims)?.claimeables || [];

  return (
    <Box className={styled.main}>
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
            <Button onClick={() => setOpenClaimAll(true)}>
              {t("claim-all")} <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Main;
