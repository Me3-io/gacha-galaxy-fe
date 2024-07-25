import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import styled from "../styled.module.scss";

const Notifications = ({ setOpenNotifications }: any) => {
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenNotifications(false)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography pb={2} className={styled.title}>
          NOTIFICATIONS
        </Typography>
      </Box>
      <Box p={2} px={3} className={styled.container}>
        <Typography>no data available</Typography>
      </Box>
    </Grid>
  );
};
export default Notifications;
