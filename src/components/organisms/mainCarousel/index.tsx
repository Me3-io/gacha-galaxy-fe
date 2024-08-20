//import { useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grow from "@mui/material/Grow";

import GameCampaingCarousel from "./carousel";
import styled from "./styled.module.scss";

const MainCarousel = ({ listGames, listCampaings, setGame, setCampaing, handleClose }: any) => {
  const open = !!listGames?.length || !!listCampaings?.length || false;
  
  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") handleClose();
  };

  return (
    <Modal open={open} className={styled.modalContainer} onClose={onClose}>
      <>
        <CloseIcon className={styled.close} onClick={(evt) => onClose(evt, "close")} />
        <Grow in={open}>
          <Box className={styled.modal}>
            <GameCampaingCarousel
              listGames={listGames || []}
              listCampaings={listCampaings || []}
              setGame={setGame}
              setCampaing={setCampaing}
            />
          </Box>
        </Grow>
      </>
    </Modal>
  );
};

export default MainCarousel;
