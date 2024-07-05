import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBuildings } from "reduxConfig/thunks/buildings";

const Buildings = ({
  handlerBuildingClick,
  handlerPartnerClick,
  handlerOver,
  handlerLeave,
  PATH_GRID,
  CENTER_MAP,
}: any) => {
  const buildingsData = useSelector(getBuildings);
  const [buildings, setBuildings] = useState<any>([]);

  /*const getSVG = async (url: string) => {
    return await fetch(url)
      .then((res) => res.text())
      .then((response) => response)
      .catch((error) => console.error("error: " + error.message));
  };*/

  // events ---
  const handlerBuilding = (evt: any, item: any) => {
    item.clickable ? handlerBuildingClick(item.games) : evt.stopPropagation();
  };

  const handlerPartner = (evt: any, item: any) => {
    item?.campaign ? handlerPartnerClick(item.campaign.claimrId) : evt.stopPropagation();
  };

  // data buildings ---

  const loadBuildings = (buildings: any[]) => {
    const data = buildings.map((item: any) => ({
      position: calculatePosition(item.anchorAddress, item.offset),
      order: {
        x: parseInt(item.anchorAddress.split(",")[0]),
        y: parseInt(item.anchorAddress.split(",")[1]),
      },
      img: item?.svg[0],
      scale: item.scale || 1,
      name: item.name || "",
      opacity: item.alpha || 1,
      clickable: !!item.gameId,
      partner: item.partner
        ? {
            name: item.partner.displayName,
            img: item.partner.logo[0],
            color: item.partner.bGColor,
            orientation: item.partnerOrientation === "LEFT" ? 26.5 : -26.5,
            scale: item.partnerScale || 1,
            position: {
              x: parseInt(item?.partnerOffset.split(",")[0]) - item.svg[0].width || 0,
              y: parseInt(item?.partnerOffset.split(",")[1]) - item.svg[0].height || 0,
            },
          }
        : null,
      games: item.gameId,
      campaign: item.campaign,
    }));

    data.sort(sortBuildings);

    return data;
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

  const calculatePosition = (anchorAddress: string, offset: string) => {
    const address = {
      x: (parseInt(anchorAddress.split(",")[0]) * PATH_GRID) / 2 + CENTER_MAP.x,
      y: (parseInt(anchorAddress.split(",")[1]) * PATH_GRID) / 4 + CENTER_MAP.y,
    };

    return {
      x: address.x + (parseInt(offset.split(",")[0]) || 0),
      y: address.y + (parseInt(offset.split(",")[1]) || 0),
    };
  };

  useEffect(() => {
    if (buildingsData) {
      const data = loadBuildings(buildingsData);
      setBuildings(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingsData]);

  return (
    <>
      {buildings.map((item: any, pos: number) => (
        <g
          key={pos}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          onClick={(evt) => handlerBuilding(evt, item)}
          onTouchStart={(evt) => evt.stopPropagation()}
        >
          <image
            style={{ cursor: item.clickable ? "pointer" : "default", opacity: item.opacity }}
            x={item.img.width * -1}
            y={item.img.height * -1}
            href={item.img.url}
            onMouseMove={() => handlerOver(item.name)}
            onMouseLeave={handlerLeave}
          />

          {item.partner && (
            <g
              onClick={(evt) => handlerPartner(evt, item)}
              transform={`translate(${item.partner.position.x} ${item.partner.position.y}) scale(${item.partner.scale}) skewY(${item.partner.orientation})`}
              onMouseMove={() => handlerOver(item.partner.name)}
              onMouseLeave={handlerLeave}
            >
              <rect
                x={0}
                y={0}
                width={item.partner.img.width}
                height={item.partner.img.height}
                fill={item.partner.color}
              />
              <image x={0} y={0} href={item.partner.img.url} style={{ cursor: "pointer" }} />
            </g>
          )}
        </g>
      ))}
    </>
  );
};

export default Buildings;
