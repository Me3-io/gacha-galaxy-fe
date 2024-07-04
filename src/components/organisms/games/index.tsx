import { useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styled from "./styled.module.scss";
import CarouselGames from "./carousel";
import GameDetails from "./details";

const games = [
  { id: "spin-the-wheel", name: "SPIN THE WHEEL", bet: 120 },
  { id: "claw-machine", name: "CLAW MACHINE", bet: 150 },
  { id: "capsule", name: "CAPSULE", bet: 350 },
  { id: "spin-the-wheel", name: "SPIN THE WHEEL", bet: 120 },
  { id: "claw-machine", name: "CLAW MACHINE", bet: 150 },
  { id: "capsule", name: "CAPSULE", bet: 350 },
];

const GameMachines = ({ open, handleClose }: any) => {
  const [openGames, setOpenGames] = useState(false);

  return (
    <Modal open={open} onClose={handleClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={handleClose} />

        {!openGames ? (
          <CarouselGames games={games} setOpenGames={setOpenGames} />
        ) : (
          <GameDetails setOpenGames={setOpenGames} />
        )}
        
      </Box>
    </Modal>
  );
};

export default GameMachines;
