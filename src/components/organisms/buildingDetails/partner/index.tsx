import { Box, Grid, Typography } from "@mui/material";
import styled from "./styled.module.scss";

const Partner = ({ buildingData }: any) => {
  const logoImg = buildingData?.partner?.img ? buildingData?.partner?.img?.url : null;

  return (
    <>
      <Box className={styled.container}>
        <Grid container justifyContent="space-between" style={{ height: "100%" }}>
          <Grid item xs={12} sm={3} md={5} lg={5} display="flex" flexDirection="column" alignItems="center">
            <div className={styled.content}>
              <Box className={styled.dotted}></Box>
              <img src={logoImg} alt="logo" height={120} width={120} className={styled.logo} loading="lazy" />
              <span className={styled.email}>{buildingData?.partner?.website}</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={7} lg={7}>
            {buildingData?.partner?.description ? (
              <Typography className={styled.description}>{buildingData?.partner?.description}</Typography>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Partner;
