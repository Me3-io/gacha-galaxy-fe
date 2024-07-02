import { useEffect, useState } from "react";

const Buildings = ({ handlerClick, handlerOver, handlerLeave, buildingsData, pathGrid }: any) => {
  const [buildings, setBuildings] = useState<any>([]);

  /*const getSVG = async (url: string) => {
    return await fetch(url)
      .then((res) => res.text())
      .then((response) => response)
      .catch((error) => console.error("error: " + error.message));
  };*/

  const calculatePosition = (anchorAddress: string, offset: string) => {
    const address = {
      x: (parseInt(anchorAddress.split(",")[0]) * pathGrid) / 2 + pathGrid / 2,
      y: (parseInt(anchorAddress.split(",")[1]) * pathGrid) / 4,
    };

    return {
      x: address.x + (parseInt(offset.split(",")[0]) || 0),
      y: address.y + (parseInt(offset.split(",")[1]) || 0),
    };
  };

  const sortBuildings = (a: any, b: any) => {
    if (a.order.y > b.order.y) return 1;
    if (a.order.y < b.order.y) return -1;
    if (a.order.y === b.order.y) {
      if (a.order.x > b.order.x) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (buildingsData?.buildings) {
      const data = buildingsData.buildings.map((item: any) => ({
        position: calculatePosition(item.anchorAddress, item.offset),
        order: {
          x: parseInt(item.anchorAddress.split(",")[0]),
          y: parseInt(item.anchorAddress.split(",")[1]),
        },
        //component: await getSVG(item?.svg[0].url),
        svg: item?.svg[0],
        scale: item.scale || 1,
        text: item.name || "",
        opacity: item.alpha || 1,
        clickable: true,
      }));

      data.sort(sortBuildings);

      //Promise.all(data).then((resolvedData) => {
      setBuildings(data);
      //});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingsData]);

  return (
    <>
      {buildings.map((item: any, pos: number) => (
        <g
          key={pos}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          onClick={(evt) => (item.clickable ? handlerClick(item.id, evt) : evt.stopPropagation())}
          onTouchStart={(evt) => evt.stopPropagation()}
          //dangerouslySetInnerHTML={{ __html: item.component }}
        >
          <image
            style={{ cursor: item.clickable ? "pointer" : "default", opacity: item.opacity }}
            x={item.svg.width * -1}
            y={item.svg.height * -1}
            href={item.svg.url}
            onMouseMove={() => handlerOver(item)}
            onMouseLeave={handlerLeave}
          />
        </g>
      ))}
    </>
  );
};

export default Buildings;
