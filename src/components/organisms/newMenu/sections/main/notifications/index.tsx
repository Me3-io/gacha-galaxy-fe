import { Box, Grid, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box className={styled.header}>
        <Typography pb={2} className={styled.title}>
          {t("menu-notifications").toUpperCase()}
        </Typography>
      </Box>
      <Box p={2} className={styled.container}>
        <Typography pb={2}>{t("no-data")}</Typography>
      </Box>
    </Grid>
  );
};
export default Notifications;
