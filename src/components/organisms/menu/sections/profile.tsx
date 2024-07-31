import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import styled from "../styled.module.scss";
import { useTranslation } from "react-i18next";

const Profile = ({ setOpenProfile }: any) => {
  const { t } = useTranslation();
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenProfile(false)}>
          <ArrowBackIcon /> {t("back")}
        </Button>
        <Typography pb={2} className={styled.title}>
          {t("menu-profile").toUpperCase()}
        </Typography>
      </Box>
      <Box p={2} px={3} className={styled.container}>
        <Typography>{t("coming-soon")}</Typography>
      </Box>
    </Grid>
  );
};
export default Profile;
