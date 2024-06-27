import { Box, ButtonBase, Grid, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "components/atoms/buttons/base";

import styled from "../styled.module.scss";

import iconUser from "assets/icons/menuUser.svg";
import iconCalendar from "assets/icons/menuCalendar.svg";
import iconHelp from "assets/icons/menuHelp.svg";
import iconSettings from "assets/icons/menuSettings.svg";

const rows = [
  { icon: iconUser, name: "Profile", onClick: () => console.log("Profile") },
  { icon: iconCalendar, name: "Upcoming Partner Schedule", onClick: () => console.log("Schedule") },
  {
    icon: iconHelp,
    name: "Help Center",
    onClick: () => window.open("https://help.me3.io/en/", "_blank"),
  },
  { icon: iconSettings, name: "Settings", onClick: () => console.log("Settings") },
];

const MenuItem = ({ icon, name, onClick }: any) => {
  return (
    <ButtonBase className={styled.item} onClick={onClick}>
      <img src={icon} alt="user" width={36} />
      <Typography>{name}</Typography>
      <ArrowForwardIcon width={36} />
    </ButtonBase>
  );
};

const Menu = ({ setOpenMenu }: any) => {
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenMenu(false)}>
          <ArrowBackIcon /> Back
        </Button>
      </Box>
      <Box p={2} className={styled.container}>
        <Box className={styled.menuContainer}>
          <Stack>
            {rows.map((row: any, pos: number) => (
              <MenuItem key={pos} {...row} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
};
export default Menu;
