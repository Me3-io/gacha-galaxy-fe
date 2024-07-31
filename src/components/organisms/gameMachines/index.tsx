import { useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import CarouselGames from "./carousel";
import GameDetails from "./details";
import Grow from "@mui/material/Grow";

import styled from "./styled.module.scss";

const GameMachines = ({ games, handleClose }: any) => {
  const [details, setDetails] = useState({ open: false, data: {} });

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") {
      setDetails({ open: false, data: {} });
      handleClose();
    }
  };

  return (
    <Modal open={games?.open || false} onClose={onClose} className={styled.modalContainer}>
      <>
        <CloseIcon className={styled.close} onClick={(evt) => onClose(evt, "close")} />
        <Grow in={games?.open}>
          <Box className={styled.modal}>
            {!details.open ? (
              <CarouselGames games={games?.data || []} setDetails={setDetails} />
            ) : (
              <GameDetails details={details.data} setDetails={setDetails} />
            )}
          </Box>
        </Grow>
      </>
    </Modal>
  );
};

export default GameMachines;
