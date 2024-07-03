import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ButtonGroup = ({ next, previous }: any) => {
  return (
    <>
      <ArrowBackIosIcon className={styled.arrowLeft} onClick={() => previous()} />
      <ArrowForwardIosIcon className={styled.arrowRight} onClick={() => next()} />
    </>
  );
};

const GameMachines = ({ open, handleClose }: any) => {
  return (
    <Modal open={open} onClose={handleClose} className={styled.modalContainer}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={handleClose} />

        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={false}
          arrows={false}
          infinite={true}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          containerClass={styled.carousel}
        >
          {games.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </Carousel>
      </Box>
    </Modal>
  );
};

export default GameMachines;
