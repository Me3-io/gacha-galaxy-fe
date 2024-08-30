import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import styled from "../styled.module.scss";
import { useTranslation } from "react-i18next";

const Notifications = ({ setOpen }: any) => {
  const { t } = useTranslation();
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box className={styled.header}>
        <Button onClick={() => setOpen(false)}>
          <ArrowBackIcon /> {t("back")}
        </Button>
        <Typography pb={2} className={styled.title}>
          {t("menu-notifications").toUpperCase()}
        </Typography>
      </Box>
      <Box p={2} className={styled.container}>
        <Typography>{t("no-data")}</Typography>
      </Box>
    </Grid>
  );
};
export default Notifications;
