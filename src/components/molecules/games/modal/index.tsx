import { Box, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/atoms/buttons/default";
import capsuleIcon from "assets/icons/capsule.svg";
import CustomTooltip from "components/atoms/materialTooltip";

//import { initializeApp } from "firebase/app";
import { TwitterAuthProvider, signInWithPopup /*, getAuth*/ } from "firebase/auth";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";

import Zoom from "@mui/material/Zoom";

import customAxios from "utils/customAxios";
import useAlert from "hooks/alertProvider/useAlert";

import styled from "./styled.module.scss";

import { auth } from "config/firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
*/
const CongratsModal = ({ open = false, data, onClose, handlePlayAgain }: any) => {
  //const auth = getAuth(app);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const twitterProvider = new TwitterAuthProvider();
  const rewardVideo = data?.rewardVideo ? data?.rewardVideo[0]?.url : null;
  const { setAlert } = useAlert();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${data?.prize} ${rewardVideo ? `- ${encodeURI(rewardVideo)}` : ""}`);
    setAlert("Copy to clipboard", "success");
  };

  const handleShare = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result: any) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const secret = credential?.secret;
        const user = result.user;

        const getLastTweet = async () => {
          customAxios()
            .post("/code/twitterupdate", {
              oauth_token: token,
              oauth_token_secret: secret,
              user_id: user.uid,
              refresh_token: user.stsTokenManager.refreshToken,
              access_token: user.stsTokenManager.accessToken,
            })
            .then((response) => {
              if (response?.data?.status === "error") {
                setAlert(response?.data?.message || "Error to Share", "error");
              } else {
                setAlert("Post successfully", "success");
              }
            })
            .catch((error: any) => {
              setAlert("Error to Share", "error");
              console.error(error?.message);
            });
        };
        getLastTweet();
      })
      .catch((error: any) => {
        setAlert("Error to Share with X", "error");
        console.error(error?.message);
      });
  };

  const viewRewards = () => {
    const mapCode = location.state?.map || "";
    navigate(`/${i18n.language}/home/${mapCode}`, { state: { openRewards: true } });
  };

  return (
    <Modal open={open} onClose={onClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={(evt: any) => onClose(evt, "close")} />

        <Zoom in={open}>
          <Box className={styled.content}>
            <Box className={styled.congratulations} />

            <Typography pt={2} className={styled.title}>
              Congratulations!
            </Typography>
            <Typography pb={0} className={styled.subtitle}>
              You won:
            </Typography>

            <Box className={styled.reward}>
              {!rewardVideo ? (
                <img src={capsuleIcon} alt="capsule" />
              ) : (
                <>
                  <CircularProgress className={styled.loader} size={40} />
                  <video loop={true} autoPlay={true} controls={false} preload="auto" muted playsInline>
                    <source src={rewardVideo} type="video/mp4" />
                  </video>
                </>
              )}
            </Box>

            <Typography pt={2} pb={2} className={styled.prize}>
              {data?.prize || ""}
            </Typography>

            {data?.rewardText && (
              <Typography pb={2} className={styled.prize}>
                {data?.rewardText || ""}
              </Typography>
            )}

            <Box className={styled.footer}>
              <Box className={styled.item}>
                <IconButton color="secondary" sx={{ display: "none" }}>
                  <CustomTooltip title={"Share with X"}>
                    <ShareIcon onClick={handleShare} />
                  </CustomTooltip>
                </IconButton>
                <IconButton color="secondary" sx={{ display: "none" }}>
                  <CustomTooltip title={"Copy"}>
                    <ContentCopyIcon onClick={handleCopy} />
                  </CustomTooltip>
                </IconButton>
                <Button onClick={viewRewards}>VIEW REWARDS COLLECTION</Button>
              </Box>
              <Box className={styled.item}>
                <Button onClick={handlePlayAgain}>PLAY AGAIN</Button>
              </Box>
            </Box>
          </Box>
        </Zoom>
      </Box>
    </Modal>
  );
};
export default CongratsModal;
