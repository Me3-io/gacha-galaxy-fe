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

const rows = [
  { icon: iconNotification, name: "Notifications", onClick: () => {} },
  { icon: iconUser, name: "Profile", onClick: () => {} },
  { icon: iconCalendar, name: "Upcoming Partner Schedule", onClick: () => {} },
  {
    icon: iconHelp,
    name: "Help Center",
    onClick: () => window.open("https://help.me3.io/en/", "_blank"),
  },
  { icon: iconSettings, name: "Settings", onClick: () => {} },
];

const MenuItem = ({ icon, name, onClick }: any) => {
  return (
    <ButtonBase className={styled.item} onClick={onClick}>
      <img src={icon} alt="icon" width={36} />
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
        <Typography className={styled.title}>MENU</Typography>
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
            <Typography className={styled.infoLabel}>New rewards!</Typography>
            <Box>
              <Typography>3</Typography>
              <span>
                Rewards <br />
                Availables
              </span>
            </Box>
          </Box>
        </Box>
        <Box className={styled.item} p={2}>
          <Box className={styled.claimBtn}>
            <ButtonDefault>CLAIM ALL</ButtonDefault>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Menu;
