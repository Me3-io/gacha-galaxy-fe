import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, SetStateAction } from "react";
import { config } from "react-spring";

const SpringCarousel = (props: any) => {
  const table = props.cards.map((element: any, index: SetStateAction<number>) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [goToSlide, setGoToSlide] = useState(0);
  const [cards] = useState(table);


  const handleNavigation = (e: any) => {
    if (e?.deltaY > 0) {
      setGoToSlide((prev) => (prev > 0 ? --prev : table.length - 1));
    } else {
      setGoToSlide((prev) => (prev < table.length - 1 ? ++prev : 0));
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleNavigation);
    return () => window.removeEventListener("wheel", handleNavigation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%", height: props.height }}>
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
