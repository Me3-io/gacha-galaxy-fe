import bgImage from "assets/images/Capsule_Machine_Front_View.png";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import styled from "./styled.module.scss";

const srcInit =
  "https://d1ikhzkdobwmqe.cloudfront.net/Gacha_Galaxy_Capsule_Machine_Game_Animation_2K.mp4";
const srcSuccess =
  "https://d1ikhzkdobwmqe.cloudfront.net/Gacha_Galaxy_Box_Game_Animation_Success_720p_Alpha.mp4";

interface State {
  status: string;
  visible: boolean;
  play: boolean;
  loop: boolean;
  source?: string;
  poster?: string;
}

const initialState: State = {
  status: "init",
  visible: false,
  play: false,
  loop: false,
  source: "",
  poster: "",
};

const Capsule = ({ onPlay, handleEnd }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gameState, setGameState] = useState(initialState);


  const bgClass =
    gameState.status === "load"
      ? styled.zoomIn
      : gameState.status !== "init"
      ? styled.zoomFixed
      : "";

  const gameSteper = () => {
    console.log("estado: ", gameState.status);
    switch (gameState.status) {
      case "init":
        setGameState({ status: "load", visible: false, play: false, loop: false });
        break;

      case "load":
        setTimeout(() => {
          setGameState({
            status: "play",
            visible: true,
            play: true,
            loop: true,
            source: srcInit,
          });
        }, 3000);
        break;

      case "play":
        setTimeout(() => {
          setGameState({
            status: "success",
            visible: true,
            play: true,
            loop: false,
            source: srcSuccess,
          });
        }, 5000);
        break;

      case "success":
        setGameState({ status: "play", visible: true, play: true, loop: true, source: srcInit });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (gameState.status === "play") gameSteper();
    if (gameState.status === "load") gameSteper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.status]);

  // start the game ---
  useEffect(() => {
    if (onPlay) gameSteper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPlay]);

  useEffect(() => {
    setGameState({ status: "init", visible: false, play: false, loop: false });
  }, []);

  return (
    <Box className={styled.main}>
      {gameState.visible && (
        <Box className={gameState.status === "play" ? styled.videoInner : styled.videoFull}>
          <video
            ref={videoRef}
            loop={gameState.loop}
            key={gameState.source}
            poster={gameState.poster}
            autoPlay={gameState.play}
            controls={false}
            muted
            playsInline
            onEnded={() => handleEnd(gameState.status)}
          >
            <source src={gameState.source} type="video/mp4" />
          </video>
        </Box>
      )}

      <Box className={styled.bgContainer} sx={{ opacity: gameState.status === "success" ? 0 : 1 }}>
        <img src={bgImage} alt="poster" className={bgClass} />
      </Box>
    </Box>
  );
};

export default Capsule;
