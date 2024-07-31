import { Box, Grid, Typography } from "@mui/material";
import ButtonDefault from "components/atoms/buttons/default";
import keyIcon from "assets/icons/key.svg";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";

const GameBar = ({ balance, onPlay, handlePlay, gameData }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Box className={styled.dotted}></Box>
      <Grid item container xs={12} className={styled.container}>
        <Grid item xs={12} className={styled.info}>
          <Typography variant="h5" className={styled.title}>
            {t("game-instructions")}
          </Typography>

          <Typography className={styled.text}>
            {gameData?.howToPlay || "No instructions available"}
          </Typography>
        </Grid>

        <Grid item xs={12} className={styled.balanceContainer}>
          <Typography
            variant="h5"
            className={styled.title}
            dangerouslySetInnerHTML={{ __html: t("game-balance") }}
          ></Typography>

          <Box className={styled.balance}>
            <img src={keyIcon} alt="key" height={"40px"} />
            <Typography className={styled.text}>{balance}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} className={styled.keyContainer}>
          <Typography variant="h5" className={styled.title}>
            {t("game-price")}
          </Typography>

          <Box className={styled.keys}>
            <img src={keyIcon} alt="key" />
            <Typography className={styled.text}>
              {gameData?.price || "-"} {t("key").toUpperCase()}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} className={styled.footer}>
        <ButtonDefault onClick={handlePlay} isLoading={onPlay} disabled={onPlay}>
          {t("play").toUpperCase()}
        </ButtonDefault>
      </Grid>
    </>
  );
};
export default GameBar;
