import { useEffect, useState } from "react";

const Buildings = ({ handlerClick, handlerOver, handlerLeave, buildingsData }: any) => {
  const [buildings, setBuildings] = useState<any>([]);

  const getSVG = async (url: string) => {
    return await fetch(url)
      .then((res) => res.text())
      .then((response) => response)
      .catch((error) => console.error("error: " + error.message));
  };

  useEffect(() => {
    if (buildingsData?.buildings) {
      console.log("buildingData:", buildingsData.buildings);

      const data = buildingsData.buildings.map(async (item: any) => ({
        position: {
          x: parseInt(item.anchorAddress.split(",")[0] || 0),
          y: parseInt(item.anchorAddress.split(",")[1] || 0),
        },
        offset: {
          x: item.offset.split(",")[0] || 0,
          y: item.offset.split(",")[1] || 0,
        },
        //component: await getSVG(item?.svg[0].url),
        url: item?.svg[0].url,
        scale: 1,
        text: item.name,
        clickable: true,
      }));

      Promise.all(data).then((resolvedData) => {
        setBuildings(resolvedData);
      });
    }
  }, [buildingsData]);

  return (
    <>
      {buildings.map((item: any, pos: number) => (
        <g
          key={pos}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          transform-origin={`${item.offset.x} ${item.offset.y}` || "0 0"}
          onClick={(evt) => (item.clickable ? handlerClick(item.id, evt) : evt.stopPropagation())}
          onTouchStart={(evt) => evt.stopPropagation()}
          onMouseMove={() => handlerOver(item)}
          onMouseLeave={handlerLeave}
          style={{ cursor: item.clickable ? "pointer" : "default" }}
          //dangerouslySetInnerHTML={{ __html: item.component }}
        >
          <image
            href={item.url}
            onMouseMove={() => handlerOver(item)}
            onMouseLeave={handlerLeave}
          />
        </g>
      ))}
    </>
  );
};

export default Buildings;
