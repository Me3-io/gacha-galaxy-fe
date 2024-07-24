import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/atoms/buttons/default";
import capsuleIcon from "assets/icons/capsule.svg";

import Zoom from "@mui/material/Zoom";

import styled from "./styled.module.scss";

const CongratsModal = ({ open = false, data, onClose }: any) => {
  return (
    <Modal open={open} onClose={onClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={(evt: any) => onClose(evt, "close")} />

        <Zoom in={open}>
          <Box className={styled.content}>
            <Box className={styled.congratulations} />

            <Typography pt={3} className={styled.title}>
              Congratulations!
            </Typography>
            <Typography pb={1} className={styled.subtitle}>
              You won:
            </Typography>

            <Box className={styled.capsule}>
              <img src={capsuleIcon} alt="capsule" />
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
