import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, SetStateAction } from "react";
import { config } from "react-spring";

let lastTime = 0;
const INTERVAL_MS = 100;

const SpringCarousel = (props: any) => {

  const table = props.cards.map((element: any, index: SetStateAction<number>) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [goToSlide, setGoToSlide] = useState(0);
  const [cards] = useState(table);

  const handleWheel = (e: any) => {
    const actualTime = new Date().getTime();
    if (lastTime + INTERVAL_MS < actualTime) {
      lastTime = actualTime;
      if (e?.deltaY > 0) {
        setGoToSlide((prev) => (prev > 0 ? --prev : table.length - 1));
      } else {
        setGoToSlide((prev) => (prev < table.length - 1 ? ++prev : 0));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%", height: props.height, overflow: "hidden" }}>
      <Carousel
        slides={cards}
        offsetRadius={2}
        goToSlide={goToSlide}
        showNavigation={false}
        animationConfig={config.default}
      />
    </div>
  );
};

export default SpringCarousel;
