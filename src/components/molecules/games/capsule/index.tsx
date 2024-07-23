import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import useResizeObserver from "use-resize-observer";

import styled from "./styled.module.scss";

import bgImage from "assets/images/Capsule_Machine_Front_View.png";
import customAxios from "utils/customAxios";
import Alert from "components/molecules/alert";
import GameModal from "components/organisms/game/modal";

const urlAnimation = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Game_Animation.mp4`;
const urlSuccess = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Animation_Success.mp4`;

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

const Capsule = ({ onPlay, handleEnd, gameData }: any) => {
  const { ref, height } = useResizeObserver();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [gameState, setGameState] = useState<State>(initialState);
  const [onSuccess, setOnSuccess] = useState(false);
  const [onError, setOnError] = useState({ show: false, msg: "" });
  const [response, setResponse] = useState<any>(null);
  const [modal, setModal] = useState({ open: false, data: {} });

  const [sourceAnimation, setSourceAnimation] = useState<string>("");
  const [sourceSuccess, setSourceSuccess] = useState<string>("");

  const states = {
    init: { status: "init", visible: false, play: false, loop: false },
    load: { status: "load", visible: false, play: false, loop: false },
    ready: { status: "ready", visible: true, play: false, loop: true, source: sourceAnimation },
    play: { status: "play", visible: true, play: true, loop: true, source: sourceAnimation },
    success: { status: "success", visible: true, play: true, loop: false, source: sourceSuccess },
  };

  const bgClass =
    gameState.status === "load"
      ? styled.zoomIn
      : gameState.status !== "init"
      ? styled.zoomFixed
      : "";

  const getResource = async (url: string) => {
    return await fetch(url)
      .then((res) => res.blob())
      .then((res) => URL.createObjectURL(res))
      .catch((error) => console.error("error: " + error.message));
  };

  // get game data ---
  const getPlayGame = () => {
    customAxios()
      .post("/game/play", {
        gameRecordId: gameData.recordId,
      })
      .then((response) => {
        if (response?.data?.status !== "error") {
          setResponse(response?.data?.result || {});
        } else {
          errorGame();
        }
      })
      .catch((error) => {
        errorGame(error);
      });
  };

  // game actions ---
  const nextStep = () => {
    if (onError.show) return;

    switch (gameState.status) {
      case "init":
        setGameState(states.load);
        break;

      case "load":
        setTimeout(() => {
          setGameState(states.play);
          if (videoRef?.current) videoRef?.current?.play();
        }, 3000);
        break;

      case "ready":
        setGameState(states.play);
        if (videoRef?.current) videoRef?.current?.play();
        break;

      case "play":
        setTimeout(() => {
          setOnSuccess(true);
        }, 5000);
        break;

      case "success":
        setGameState(states.play);
        break;

      default:
        break;
    }
  };

  const endGame = () => {
    setModal({ open: true, data: response });
    handleEnd(response);
    setResponse(null);
  };

  const errorGame = (error?: string) => {
    setOnError({ show: true, msg: "Error to play game." });
    setTimeout(() => {
      setGameState(states.ready);
      if (videoRef?.current) videoRef?.current?.pause();
      handleEnd({ error });
    }, 3000);
  };

  // effects ---
  useEffect(() => {
    if (gameState.status !== "success" && gameState.status !== "ready") nextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.status]);

  useEffect(() => {
    if (onSuccess && response) {
      setOnSuccess(false);
      setGameState(states.success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSuccess, response]);

  // start the game ---
  useEffect(() => {
    if (onPlay) {
      nextStep();
      getPlayGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPlay]);

  // on close congrats modal ---
  useEffect(() => {
    if (!modal.open && gameState.status !== "init") setGameState(states.ready);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal?.open]);

  useEffect(() => {
    setGameState(states.init);

    (async () => {
      const sourceA = (await getResource(urlAnimation)) || "";
      const sourceB = (await getResource(urlSuccess)) || "";

      setSourceAnimation(sourceA);
      setSourceSuccess(sourceB);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styled.main}>
      <Box ref={ref} className={styled.videoInner} sx={{ opacity: gameState.visible ? 1 : 0 }}>
        {gameState.visible && (
          <video
            ref={videoRef}
            loop={gameState.loop}
            key={gameState.source}
            poster={gameState.poster}
            autoPlay={gameState.play}
            controls={false}
            preload="auto"
            muted
            playsInline
            onEnded={endGame}
            style={{ width: height ? height : "100%" }}
          >
            <source src={gameState.source} type="video/mp4" />
          </video>
        )}
      </Box>

      <Box className={styled.bgContainer}>
        <img src={bgImage} alt="poster" className={bgClass} />
      </Box>

      <GameModal {...modal} onClose={() => setModal({ open: false, data: {} })} />

      {onError.show && (
        <Alert onClose={() => setOnError({ show: false, msg: "" })}>
          {onError.msg || "Error to login."}
        </Alert>
      )}
    </Box>
  );
};

export default Capsule;
