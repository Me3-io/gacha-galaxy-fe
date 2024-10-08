import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from 'components/atoms/buttons/base';
import ButtonDefault from 'components/atoms/buttons/default';

import styled from './styled.module.scss';
import { useTranslation } from 'react-i18next';

const GetTokens = ({ setOpen }: any) => {
  const { t } = useTranslation();
  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box className={styled.header}>
        <Button onClick={() => setOpen(false)}>
          <ArrowBackIcon /> {t('back')}
        </Button>
        <Typography pb={2} className={styled.title}>
          {t('get-keys').toUpperCase()}
        </Typography>
      </Box>
      <Box p={2} pb={5} className={styled.container}>
        <ButtonDefault>BUY TOKENS</ButtonDefault>
        <Box className={styled.divider}></Box>
        <ButtonDefault>BUY MEMEMSHIP</ButtonDefault>
      </Box>
    </Grid>
  );
};
export default GetTokens;
