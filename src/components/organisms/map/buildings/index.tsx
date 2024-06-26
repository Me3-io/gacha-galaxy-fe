import { useEffect, useState } from "react";

const Buildings = ({ handlerClick, handlerOver, handlerLeave }: any) => {
  const [svg, setSvg] = useState<any>();
  const url = "https://targets-assets.s3.ap-southeast-1.amazonaws.com/GG-Building1.svg";

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
      position: { x: 0, y: 0 },
      scale: 1,
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
