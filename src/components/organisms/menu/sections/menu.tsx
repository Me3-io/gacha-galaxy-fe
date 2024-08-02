import { Box, ButtonBase, Grid, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

import styled from "../styled.module.scss";

import iconNotification from "assets/icons/notification.svg";
import iconUser from "assets/icons/menuUser.svg";
import iconCalendar from "assets/icons/menuCalendar.svg";
import iconHelp from "assets/icons/menuHelp.svg";
import iconSettings from "assets/icons/menuSettings.svg";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { getClaims } from "reduxConfig/thunks/claim";

const MenuItem = ({ icon, name, onClick }: any) => {
  return (
    <ButtonBase className={styled.item} onClick={onClick}>
      <img src={icon} alt="icon" width={36} />
      <Typography>{name}</Typography>
      <ArrowForwardIcon width={36} />
    </ButtonBase>
  );
};

const Menu = ({
  setOpenMenu,
  setOpenClaimAll,
  setOpenNotifications,
  setOpenProfile,
  setOpenSettings,
}: any) => {
  const { t } = useTranslation();

  const claims = useSelector(getClaims);

  const rows = [
    {
      icon: iconNotification,
      name: t("menu-notifications"),
      onClick: () => setOpenNotifications(true),
    },
    { icon: iconUser, name: t("menu-profile"), onClick: () => setOpenProfile(true) },
    { icon: iconCalendar, name: t("menu-schedule"), onClick: () => {} },
    {
      icon: iconHelp,
      name: t("menu-help"),
      onClick: () => window.open("https://help.me3.io/en/", "_blank"),
    },
    { icon: iconSettings, name: t("menu-settings"), onClick: () => setOpenSettings(true) },
  ];

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenMenu(false)}>
          <ArrowBackIcon /> {t("back")}
        </Button>
        <Typography className={styled.title}>{t("menu").toUpperCase()}</Typography>
      </Box>
      <Box px={3} className={styled.container}>
        <Box className={styled.menuContainer}>
          <Stack>
            {rows.map((row: any, pos: number) => (
              <MenuItem key={pos} {...row} />
            ))}
          </Stack>
        </Box>
      </Box>
      <Box p={2} className={styled.footer} sx={{ background: "#180924b3" }}>
        <Box className={styled.item} px={2}>
          <Box className={styled.rewards}>
            <Typography className={styled.infoLabel}>{t("new-rewards")}</Typography>
            <Box>
              <Typography>{claims?.length || 0}</Typography>
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
export default Menu;
