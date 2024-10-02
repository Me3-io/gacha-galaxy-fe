import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import useResizeObserver from "use-resize-observer";

import useAlert from "hooks/alertProvider/useAlert";
import customAxios from "utils/customAxios";
import CongratsModal from "components/molecules/games/modal";

import styled from "./styled.module.scss";

// resources ---
const machine = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/Front_View.png`;
const poster = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/poster.jpg`;
//const urlAnimationMissItem = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/Animation_Miss_Item.mp4`;
//const urlAnimationDropinPlace = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/Animation_Drop_in_Place.mp4`;
//const urlAnimationDropNearWinner = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/Animation_Drop_Near_Winner.mp4`;
const urlSuccess = `${process.env.REACT_APP_ASSETS_URL}/ClawMachine/Animation_Success.mp4`;

interface State {
  status: string;
  visible: boolean;
  source?: string;
}

const initialState: State = {
  status: "init",
  visible: false,
  source: "",
};

const ClawMachine = ({ onPlay, handleEnd, handlePlay, gameData }: any) => {
  const { ref, height } = useResizeObserver();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<State>(initialState);
  const [response, setResponse] = useState<any>(null);
  const [modal, setModal] = useState({ open: false, data: {} });

  const [sources, setSources] = useState<string[]>([]);

  const states = {
    init: { status: "init", visible: false },
    load: { status: "load", visible: false },
    ready: { status: "ready", visible: true, source: sources[0] },
    play: { status: "play", visible: true, source: sources[0] },
  };

  const bgClass = gameState.status === "load" ? styled.zoomIn : gameState.status !== "init" ? styled.zoomFixed : "";

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
  const nextStep = (sourceAnimation?: string) => {
    //if (onError.show) return;

    switch (gameState.status) {
      case "init":
        setGameState(states.load);
        setTimeout(() => {
          setGameState(states.ready);
        }, 3000);
        break;

      case "ready":
        setGameState({ ...states.play, source: sourceAnimation });
        break;

      default:
        break;
    }
  };

  const endGame = () => {
    setModal({ open: true, data: response });
    handleEnd(response);
    setGameState(states.ready);
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

  // effects ---
  useEffect(() => {
    if (gameState.status === "play") {
      if (videoRef?.current) videoRef?.current?.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.status]);

  useEffect(() => {
    if (response) {
      if (gameState.status === "load" || gameState.status === "ready") {
        //const rnd = Math.floor(Math.random() * 3);
        //const pos = response?.rewardVideo ? 3 : rnd;
        //console.log("pos", pos);
        //nextStep(sources[pos]);
        nextStep(sources[3]); // <-- ALWAYS SUCCESS !!!
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, gameState.status]);

  const handlePlayAgain = () => {
    setModal({ open: false, data: {} });
    handlePlay();
  };

  // start the game ---
  useEffect(() => {
    if (onPlay) {
      if (gameState.status === "init") nextStep();
      getPlayGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPlay]);

  useEffect(() => {
    setGameState(states.init);

    (async () => {
      setLoading(true);
      const sourceA = ""; // (await getResource(urlAnimationMissItem)) || ""; // pos 0
      const sourceB = ""; // (await getResource(urlAnimationDropinPlace)) || ""; // pos 1
      const sourceC = ""; // (await getResource(urlAnimationDropNearWinner)) || ""; // pos 2
      const sourceD = (await getResource(urlSuccess)) || ""; // pos 3

      setSources([sourceA, sourceB, sourceC, sourceD]);
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
                key={gameState.source}
                poster={poster}
                loop={false}
                autoPlay={false}
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
            <img alt="machine" className={bgClass} src={machine} loading="lazy" />
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

export default ClawMachine;
