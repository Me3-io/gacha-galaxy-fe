import { Box, Grid } from "@mui/material";
import styled from "./styled.module.scss";
import TwitterIcon from "assets/icons/miniTwitter.svg";
import TelegramIcon from "assets/icons/miniTelegram.svg";
import DiscordIcon from "assets/icons/miniDiscord.svg";
import GmailIcon from "assets/icons/miniGmail.svg";

const Partner = ({ buildingData }: any) => {
  const logoImg = buildingData?.partner?.img ? buildingData?.partner?.img?.url : null;

  return (
    <>
      <Box className={styled.container}>
        <Box className={styled.border}></Box>
        <Grid container justifyContent="space-between" style={{ height: "100%" }}>
          <Grid item xs={12} sm={3} md={5} lg={5} display="flex" flexDirection="column" alignItems="center">
            <div className={styled.content}>
              <Box className={styled.dotted}></Box>
              <img src={logoImg} alt="logo" height={120} width={120} className={styled.logo} loading="lazy" />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={7} lg={7} className={styled.containText}>
            <Grid item xs={12}>
              {buildingData?.partner?.description && (
                <Box className={styled.description}>{buildingData?.partner?.description}</Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box className={styled.email}>{buildingData?.partner?.website}</Box>
            </Grid>
            <Grid item xs={12} pt={3}>
              <Box className={styled.socialIcos}>
                <img src={TwitterIcon} alt="twitter" />
                <img src={TelegramIcon} alt="telegram" />
                <img src={DiscordIcon} alt="discord" />
                <img src={GmailIcon} alt="gmail" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Partner;
