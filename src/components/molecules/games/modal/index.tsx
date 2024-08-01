import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/atoms/buttons/default";
import capsuleIcon from "assets/icons/capsule.svg";

import Zoom from "@mui/material/Zoom";

import styled from "./styled.module.scss";

const CongratsModal = ({ open = false, data, onClose }: any) => {
  const rewardVideo = data?.rewardVideo ? data?.rewardVideo[0]?.url : null;
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
                  <video
                    loop={true}
                    autoPlay={true}
                    controls={false}
                    preload="auto"
                    muted
                    playsInline
                  >
                    <source src={rewardVideo} type="video/mp4" />
                  </video>
                </>
              )}
            </Box>

            <Typography pt={2} pb={4} className={styled.prize}>
              {data?.prize || ""}
            </Typography>

            <Button onClick={(evt: any) => onClose(evt, "close")}>ACCEPT</Button>
          </Box>
        </Zoom>
      </Box>
    </Modal>
  );
};
export default CongratsModal;
