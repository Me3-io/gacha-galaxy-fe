import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Card from "./card";
import styled from "./styled.module.scss";



const ButtonGroup = ({ next, previous }: any) => {
  return (
    <>
      <ArrowBackIosIcon className={styled.arrowLeft} onClick={() => previous()} />
      <ArrowForwardIosIcon className={styled.arrowRight} onClick={() => next()} />
    </>
  );
};

const CarouselGames = ({ games, setOpenGames }: any) => {

  const length = games.length >= 3 ? 3 : games.length;
  
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
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
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
      {games.map((item: any, i: any) => (
        <Card key={i} {...item} setOpenGames={setOpenGames} />
      ))}
    </Carousel>
  );
};

export default CarouselGames;
