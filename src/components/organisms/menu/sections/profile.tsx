import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";

import styled from "../styled.module.scss";

const Profile = ({ setOpenProfile }: any) => {
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenProfile(false)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography pb={2} className={styled.title}>
          PROFILE
        </Typography>
      </Box>
      <Box p={2} px={3} className={styled.container}>
        <Typography>coming soon</Typography>
      </Box>
    </Grid>
  );
};
export default Profile;
