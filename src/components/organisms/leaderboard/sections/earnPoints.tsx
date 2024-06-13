import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "components/atoms/buttons/base";

import styled from "../styled.module.scss";

const EarnPoints = ({ setOpenPoints }: any) => {
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenPoints(false)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography pb={2} className={styled.title}>
          EARN POINTS
        </Typography>
      </Box>
      <Box p={2} className={styled.container}></Box>
    </Grid>
  );
};
export default EarnPoints;
