import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SpringCarousel from "components/molecules/springCarousel";
import Card from "./card";

import styled from "./styled.module.scss";

const GameMachines = ({ open, handleClose }: any) => {
  const games = [
    { key: 1, content: <Card name="SPIN THE WHEEL" bet={120} /> },
    { key: 2, content: <Card name="CLAW MACHINE" bet={150} /> },
    { key: 3, content: <Card name="CAPSULE" bet={350} /> },
    { key: 4, content: <Card name="SPIN THE WHEEL" bet={120} /> },
    { key: 5, content: <Card name="CLAW MACHINE" bet={150} /> },
    { key: 6, content: <Card name="CAPSULE" bet={350} /> },
  ];

  return (
    <Modal open={open} onClose={handleClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={handleClose} />
        <SpringCarousel cards={games} height="600px" />
      </Box>
    </Modal>
  );
};

export default GameMachines;
