import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import useResizeObserver from "use-resize-observer";

import useAlert from "hooks/alertProvider/useAlert";
import customAxios from "utils/customAxios";
import CongratsModal from "components/molecules/games/modal";

import styled from "./styled.module.scss";

// resources ---
import machine from "assets/games/capsule/machine_front_view.png";
import machineEmpty from "assets/games/capsule/machine_front_view_empty.png";

const urlAnimation = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Game_Animation.mp4`;
const urlSuccess = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Animation_Success.mp4`;
// rewards ---
//const rewardChainGPT = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Rewards/ChainGPT.mp4`;
//const rewardTheGraph = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Rewards/The_Graph.mp4`;
//const rewardTrustSwap = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Rewards/TrustSwap.mp4`;
//const rewardPythNetwork = `${process.env.REACT_APP_ASSETS_URL}/Capsule/Rewards/Pyth_Network.mp4`;

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

const Capsule = ({ onPlay, handleEnd, handlePlay, gameData }: any) => {
  const { ref, height } = useResizeObserver();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<State>(initialState);
  const [onSuccess, setOnSuccess] = useState(false);

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
    //const reward = getReward(response?.prize);
    setModal({ open: true, data: response });
    handleEnd(response);
    setResponse(null);
  };

  const errorGame = (error?: string) => {
    setAlert("Error to play game.", "error");
    setTimeout(() => {
      setGameState(states.ready);
      if (videoRef?.current) videoRef?.current?.pause();
      handleEnd({ error });
    }, 3000);
  };

  const handlePlayAgain = () => {
    setModal({ open: false, data: {} });
    handlePlay();
  };

  /*const getReward = (type: string) => {
    if (/ChainGPT/.test(type)) return rewardChainGPT;
    if (/The Graph/.test(type)) return rewardTheGraph;
    if (/TrustSwap/.test(type)) return rewardTrustSwap;
    if (/Pyth Network/.test(type)) return rewardPythNetwork;
    return null;
  };*/

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
    if (modal.open && gameState.status !== "init") setGameState(states.ready);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal?.open]);

  useEffect(() => {
    setGameState(states.init);

    (async () => {
      setLoading(true);
      const sourceA = (await getResource(urlAnimation)) || "";
      const sourceB = (await getResource(urlSuccess)) || "";

      setSourceAnimation(sourceA);
      setSourceSuccess(sourceB);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <Box className={styled.loading}>
          <CircularProgress className={styled.spinner} size={36} />
          loading game...
        </Box>
      )}
      <Fade in={true}>
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
                style={{ width: height ? height : "auto" }}
              >
                <source src={gameState.source} type="video/mp4" />
              </video>
            )}
          </Box>

          <Box className={styled.bgContainer}>
            <img
              alt="machine"
              className={bgClass}
              src={gameState.status === "success" ? machineEmpty : machine}
            />
          </Box>

          <CongratsModal
            {...modal}
            onClose={() => setModal({ open: false, data: {} })}
            handlePlayAgain={handlePlayAgain}
          />
        </Box>
      </Fade>
    </>
  );
};

export default Capsule;
