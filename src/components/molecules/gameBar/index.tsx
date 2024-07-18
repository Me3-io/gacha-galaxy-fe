import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ButtonDefault from "components/atoms/buttons/default";
import keyIcon from "assets/icons/key.svg";

import styled from "./styled.module.scss";

const sourceInit =
  "https://d1ikhzkdobwmqe.cloudfront.net/Gacha_Galaxy_Capsule_Machine_Game_Animation_2K.mp4";
const sourceSuccess =
  "https://d1ikhzkdobwmqe.cloudfront.net/Gacha_Galaxy_Box_Game_Animation_Success_720p_Alpha.mp4";
const sourceFail =
  "https://d1ikhzkdobwmqe.cloudfront.net/Gacha_Galaxy_Capsule_Game_Animation_Fail_720p_Alpha.mp4";

const GameBar = ({ gameState, setGameState }: any) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(7);

  const gameSteper = () => {
    switch (gameState.step) {
      case "init":
        setLoading(true);
        setGameState({ step: "zoom", play: false, loop: false });
        break;

      case "zoom":
        setTimeout(() => {
          setGameState({ source: sourceInit, step: "play", play: true, loop: true });
        }, 3000);
        break;

      case "play":
        setTimeout(() => {
          setBalance(balance - 1);
          setLoading(false);

          if (Math.random() >= 0.4) {
            setGameState({ step: "success", play: true, loop: false, source: sourceSuccess });
          } else {
            setGameState({ step: "fail", play: true, loop: false, source: sourceFail });
          }
        }, 5000);
        break;

      case "success":
      case "fail":
        setLoading(true);
        setGameState({ source: sourceInit, step: "play", play: true, loop: true });
        break;

      default:
        break;
    }
  };

  const handleClick = () => {
    if (balance === 0) return;
    gameSteper();
  };

  useEffect(() => {
    if (gameState.step === "play") gameSteper();
    if (gameState.step === "zoom") gameSteper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.step]);

  useEffect(() => {
    setGameState({
      step: "init",
      source:
        "https://d1ikhzkdobwmqe.cloudfront.net/Gacha_Galaxy_Capsule_Machine_Game_Animation_2K.mp4",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className={styled.dotted}></Box>
      <Grid item container xs={12} className={styled.container}>
        <Grid item xs={12} className={styled.info}>
          <Typography variant="h5" className={styled.title}>
            INSTRUCTIONS
          </Typography>

          <Typography className={styled.text}>
            The original Gacha game! Get your keys out, and get ready to play for randomized loot
            where every key grants you a prize.
          </Typography>
        </Grid>

        <Grid item xs={12} className={styled.balanceContainer}>
          <Typography variant="h5" className={styled.title}>
            YOUR KEYS <br /> BALANCE
          </Typography>

          <Box className={styled.balance}>
            <img src={keyIcon} alt="key" height={"40px"} />
            <Typography className={styled.text}>{balance}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} className={styled.keyContainer}>
          <Typography variant="h5" className={styled.title}>
            PLAY PRICE
          </Typography>

          <Box className={styled.keys}>
            <img src={keyIcon} alt="key" />
            <Typography className={styled.text}>1 KEY</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} className={styled.footer}>
        <ButtonDefault onClick={handleClick} isLoading={loading} disabled={balance === 0}>
          {gameState.step === "fail" || gameState.step === "success" ? "PLAY AGAIN" : "PLAY"}
        </ButtonDefault>
      </Grid>
    </>
  );
};
export default GameBar;
