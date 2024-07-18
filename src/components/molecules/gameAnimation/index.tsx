import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import styled from "./styled.module.scss";

const GameAnimation = ({ bg, step, poster, source, play = false, loop = false, onEnded }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play && videoRef?.current && videoRef?.current?.paused) {
      videoRef.current?.play();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, videoRef?.current]);

  /*useEffect(() => {
    console.log("step", step);
  }, [step]);*/

  const bgClass = step === "zoom" ? styled.zoomIn : step === "play" ? styled.zoomFixed : "";

  return (
    <Box className={styled.main}>
      {step !== "init" && step !== "zoom" && (
        <Box className={step === "play" ? styled.videoInner : styled.fullVideo}>
          <video
            ref={videoRef}
            loop={loop}
            key={source}
            poster={poster}
            autoPlay={play}
            controls={false}
            muted
            playsInline
            onEnded={onEnded}
          >
            <source src={source} type="video/mp4" />
          </video>
        </Box>
      )}

      {step !== "success" && step !== "fail" && (
        <Box className={styled.bgContainer}>
          <img src={bg} alt="poster" className={bgClass} />
        </Box>
      )}
    </Box>
  );
};
export default GameAnimation;
