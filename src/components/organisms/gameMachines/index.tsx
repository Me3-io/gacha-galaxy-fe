import { useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styled from "./styled.module.scss";
import CarouselGames from "./carousel";
import GameDetails from "./details";

/*const games = [
  { id: "spin-the-wheel", name: "SPIN THE WHEEL", bet: 120 },
  { id: "claw-machine", name: "CLAW MACHINE", bet: 150 },
  { id: "capsule", name: "CAPSULE", bet: 350 },
  { id: "spin-the-wheel", name: "SPIN THE WHEEL", bet: 120 },
  { id: "claw-machine", name: "CLAW MACHINE", bet: 150 },
  { id: "capsule", name: "CAPSULE", bet: 350 },
];*/

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
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={(evt) => onClose(evt, "close")} />

        {!details.open ? (
          <CarouselGames games={games?.data || []} setDetails={setDetails} />
        ) : (
          <GameDetails details={details.data} setDetails={setDetails} />
        )}
      </Box>
    </Modal>
  );
};

export default GameMachines;
