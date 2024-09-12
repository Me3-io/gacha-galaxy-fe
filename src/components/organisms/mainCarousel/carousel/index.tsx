import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Card from "./card";
import styled from "./styled.module.scss";
import { Box } from "@mui/material";

const ButtonGroup = ({ next, previous }: any) => {
  return (
    <Box className={styled.arrowContainer}>
      <ArrowBackIosIcon className={styled.arrowLeft} onClick={() => previous()} />
      <ArrowForwardIosIcon className={styled.arrowRight} onClick={() => next()} />
    </Box>
  );
};

const GameCampaingCarousel = ({ listGames, listCampaings, setGame, setCampaing }: any) => {
  const total = listGames?.length + listCampaings?.length || 1;
  const length = total >= 3 ? 3 : total;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: length,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: length,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
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
      {listCampaings?.map((item: any) => (
        <Card key={item?.claimrId} item={item} setDetails={setCampaing} type="campaing" />
      ))}

      {listGames?.map((item: any) => (
        <Card key={item?.code} item={item} setDetails={setGame} type="game" />
      ))}
    </Carousel>
  );
};

export default GameCampaingCarousel;
