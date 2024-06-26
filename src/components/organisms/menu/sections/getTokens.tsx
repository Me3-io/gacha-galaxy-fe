import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "components/atoms/buttons/base";
import ButtonDefault from "components/atoms/buttons/default";

import styled from "../styled.module.scss";

const GetTokens = ({ setOpenTokens }: any) => {
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box p={2} className={styled.header}>
        <Button onClick={() => setOpenTokens(false)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography pb={2} className={styled.title}>
          GET TOKENS
        </Typography>
      </Box>
      <Box p={2} className={styled.container}>
        <Box className={styled.tokensContainer}>
          <ButtonDefault>BUY TOKENS</ButtonDefault>
          <Box className={styled.divider}></Box>
          <ButtonDefault>BUY MEMEMSHIP</ButtonDefault>
        </Box>
      </Box>
    </Grid>
  );
};
export default GetTokens;
