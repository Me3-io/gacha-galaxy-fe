import { useState } from "react";
import { Box, ButtonBase, Fade, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import iconUser from "assets/icons/menuUser.svg";
//import iconCalendar from "assets/icons/menuCalendar.svg";
import iconHelp from "assets/icons/menuHelp.svg";
//import iconSettings from "assets/icons/menuSettings.svg";
import { useTranslation } from "react-i18next";

import Profile from "./profile/profile";
import Settings from "./settings/settings";

import styled from "./styled.module.scss";

const MenuItem = ({ icon, name, onClick }: any) => {
  return (
    <ButtonBase className={styled.item} onClick={onClick}>
      <img src={icon} alt="icon" width={36} />
      <Typography>{name}</Typography>
      <ArrowForwardIcon width={36} />
    </ButtonBase>
  );
};

const SectionItem = ({ children, open, opacity = 1 }: any) => {
  const position = opacity && open ? "relative" : "absolute!important";
  return (
    <Box
      component="section"
      className={styled.sectionItem}
      left={open ? "0!important" : "100%"}
      sx={{ opacity, position }}
    >
      {children}
    </Box>
  );
};

const Menu = () => {
  const { t } = useTranslation();
  const [openProfile, setOpenProfile] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const rows = [
    { icon: iconUser, name: t("menu-profile"), onClick: () => setOpenProfile(true) },
   // { icon: iconCalendar, name: t("menu-schedule"), onClick: () => {} },
    {
      icon: iconHelp,
      name: t("menu-help"),
      onClick: () => window.open("https://help.me3.io/en/", "_blank"),
    },
   //{ icon: iconSettings, name: t("menu-settings"), onClick: () => setOpenSettings(true) },
  ];

  const mainOpacity = openProfile || openSettings ? 0 : 1;

  return (
    <Fade in={true} timeout={500}>
      <Box className={styled.menuContainer}>
        <SectionItem open={true} opacity={mainOpacity}>
          <Stack px={1}>
            {rows.map((row: any, pos: number) => (
              <MenuItem key={pos} {...row} />
            ))}
          </Stack>
        </SectionItem>

        <SectionItem open={openProfile}>
          <Profile setOpen={setOpenProfile} />
        </SectionItem>

        <SectionItem open={openSettings}>
          <Settings setOpen={setOpenSettings} />
        </SectionItem>
      </Box>
    </Fade>
  );
};
export default Menu;
