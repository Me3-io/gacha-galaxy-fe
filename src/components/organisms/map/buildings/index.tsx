import { useEffect, useState } from "react";
//import test from "../items/test";

const Buildings = ({ handlerClick, handlerOver, handlerLeave }: any) => {
  const [svg, setSvg] = useState<any>();
  const url = "https://d1ikhzkdobwmqe.cloudfront.net/building1.svg";

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then(setSvg)
      .catch((error) => console.log("error: " + error.message));
  }, [url]);

  const elements = [
    {
      id: 1,
      component: svg,
      position: { x: 25, y: -6 },
      scale: 2.65,
      text: "3 Games Available",
      clickable: true,
    },
  ];

  return (
    <>
      {elements.map((item) => (
        <g
          key={item.id}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          transform-origin="-59 1"
          transform-box="fill-box"
          onClick={(evt) => (item.clickable ? handlerClick(item.id, evt) : evt.stopPropagation())}
          onTouchStart={(evt) => evt.stopPropagation()}
          onMouseOver={() => handlerOver(item)}
          onMouseLeave={handlerLeave}
          style={{ cursor: item.clickable ? "pointer" : "default" }}
          dangerouslySetInnerHTML={{ __html: item.component }}
        ></g>
      ))}
    </>
  );
};

export default Buildings;
