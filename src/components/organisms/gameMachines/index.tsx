import { Box, Button, Modal } from "@mui/material";

import SpringCarousel from "components/molecules/springCarousel";

import styled from "./styled.module.scss";

const Card = ({ name }: any) => {
  return (
    <Box className={styled.card}>
      <span>{name}</span>
      <Button variant="contained">play</Button>
    </Box>
  );
};

const GameMachines = ({ open, handleClose }: any) => {
  const games = [
    { key: 1, content: <Card name="game 1" /> },
    { key: 2, content: <Card name="game 2" /> },
    { key: 3, content: <Card name="game 3" /> },
    { key: 4, content: <Card name="game 4" /> },
    { key: 5, content: <Card name="game 5" /> },
  ];

  return (
    <Modal open={open} onClose={handleClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <SpringCarousel cards={games} height="500px" />
      </Box>
    </Modal>
  );
};

export default GameMachines;
