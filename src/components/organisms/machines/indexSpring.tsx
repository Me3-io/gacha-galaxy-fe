import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SpringCarousel from "components/molecules/springCarousel";
import Card from "./card";

import styled from "./styled.module.scss";

const games = [
  { id: "spin-the-wheel", name: "SPIN THE WHEEL", bet: 120 },
  { id: "claw-machine", name: "CLAW MACHINE", bet: 150 },
  { id: "capsule", name: "CAPSULE", bet: 350 },
  { id: "spin-the-wheel", name: "SPIN THE WHEEL", bet: 120 },
  { id: "claw-machine", name: "CLAW MACHINE", bet: 150 },
  { id: "capsule", name: "CAPSULE", bet: 350 },
];

const GameMachines = ({ open, handleClose }: any) => {
  const cards = games.map((item, key) => ({ key, content: <Card {...item} /> }));

  return (
    <Modal open={open} onClose={handleClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={handleClose} />
        <SpringCarousel cards={cards} height="600px" />
      </Box>
    </Modal>
  );
};

export default GameMachines;
