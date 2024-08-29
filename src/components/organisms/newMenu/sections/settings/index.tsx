import { useState } from "react";
import { Box, ButtonBase, Fade, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styled from "./styled.module.scss";

import iconNotification from "assets/icons/notification.svg";
import iconUser from "assets/icons/menuUser.svg";
import iconCalendar from "assets/icons/menuCalendar.svg";
import iconHelp from "assets/icons/menuHelp.svg";
import iconSettings from "assets/icons/menuSettings.svg";
import { useTranslation } from "react-i18next";

const MenuItem = ({ icon, name, onClick }: any) => {
  return (
    <ButtonBase className={styled.item} onClick={onClick}>
      <img src={icon} alt="icon" width={36} />
      <Typography>{name}</Typography>
      <ArrowForwardIcon width={36} />
    </ButtonBase>
  );
};

const Settings = () => {
  const [openClaimAll, setOpenClaimAll] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const { t } = useTranslation();

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
    <Fade in={true} timeout={500}>
      <Box className={styled.menuContainer} p={1}>
        <Stack>
          {rows.map((row: any, pos: number) => (
            <MenuItem key={pos} {...row} />
          ))}
        </Stack>
      </Box>
    </Fade>
  );
};
export default Settings;
