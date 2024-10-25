import { useContext, useEffect, useState } from "react";
import { MapContext } from "pages/home";

import styled from "../styled.module.scss";

const Buildings = ({ handlerBuildingClick, handlerOver, handlerLeave, PATH_GRID, CENTER_MAP, setLoading }: any) => {
  const { map } = useContext(MapContext);
  const [buildings, setBuildings] = useState<any>([]);

  // events ---
  const handlerBuilding = (evt: any, item: any) => {
    evt.stopPropagation();
    handlerBuildingClick(item.games, item.campaigns, item.code, item.background, item.partner);
  };

  const getResource = async (url: string) => {
    return await fetch(url)
      .then((res) => res.blob())
      .then((res) => URL.createObjectURL(res))
      .catch((error) => console.error("error: " + error.message));
  };

  const loadBuildings = (buildings: any[]) => {
    setLoading(true);

    const data = buildings?.map(async (item: any) => ({
      code: item.code,
      position: calculatePosition(item.anchorAddress, item.offset),
      order: {
        x: item?.anchorAddress ? parseInt(item.anchorAddress.split(",")[0]) : 0,
        y: item?.anchorAddress ? parseInt(item.anchorAddress.split(",")[1]) : 0,
      },
      img: item?.svg?.length && item?.svg[0],
      component: item?.svg?.length && (await getResource(item?.svg[0].url)),
      scale: item.scale || 1,
      name: item.name || "",
      opacity: item.alpha || 1,
      partner:
        item.partner && item.partner?.logo?.length
          ? {
              name: item.partner.displayName,
              description: item?.partner?.description,
              twitter: item?.partner?.twitter,
              discord: item?.partner?.discord,
              telegram: item?.partner?.telegram,
              website: item?.partner?.website,
              img: item.partner.logo[0],
              component: await getResource(item.partner.logo[0].url),
              color: item.partner.bGColor || "transparent",
              orientation: item.partnerOrientation === "LEFT" ? 26.5 : -26.5,
              scale: item.partnerScale || 1,
              position: item?.svg?.length
                ? {
                    x: item?.partnerOffset ? parseInt(item.partnerOffset.split(",")[0]) - item.svg[0].width : 0,
                    y: item?.partnerOffset ? parseInt(item.partnerOffset.split(",")[1]) - item.svg[0].height : 0,
                  }
                : { x: 0, y: 0 },
            }
          : null,
      games: item.games || [],
      campaigns: item.campaigns || [],
      background: (item?.background?.length && item?.background[0]) || "",
    }));

    Promise.all(data).then((resolvedData) => {
      setLoading(false);
      resolvedData.sort(sortBuildings);
      setBuildings(resolvedData);
    });
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
    if (!anchorAddress || !offset) return { x: 0, y: 0 };

    const address = {
      x: (parseInt(anchorAddress.split(",")[0]) * PATH_GRID) / 2 + CENTER_MAP.x,
      y: (parseInt(anchorAddress.split(",")[1]) * PATH_GRID) / 4 + CENTER_MAP.y,
    };

    return {
      x: address.x + (parseInt(offset.split(",")[0]) || 0),
      y: address.y + (parseInt(offset.split(",")[1]) || 0),
    };
  };

  // onload ---
  useEffect(() => {
    if (map) {
      loadBuildings(map?.buildings || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <>
      {
        buildings?.length > 0 &&
          buildings?.map((item: any, pos: number) => (
            <g
              key={pos}
              transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
              onClick={(evt) => handlerBuilding(evt, item)}
              onTouchEnd={(evt) => evt.stopPropagation()}
              className={`${styled.building} ${pos === buildings?.length - 1 ? "building-step" : ""}`}
            >
              <image
                style={{
                  cursor: item.games || item.campaing ? "pointer" : "default",
                  opacity: item.opacity,
                }}
                x={item?.img?.width * -1}
                y={item?.img?.height * -1}
                href={item.component}
                onMouseMove={() => handlerOver(item.name)}
                onMouseLeave={handlerLeave}
              />

              {item.partner && (
                <g
                  className={styled.partner}
                  transform={`translate(${item.partner.position.x} ${item.partner.position.y}) scale(${item.partner.scale}) skewY(${item.partner.orientation})`}
                  onMouseMove={() => handlerOver(item.partner.name)}
                  onMouseLeave={handlerLeave}
                  onTouchEnd={(evt) => evt.stopPropagation()}
                >
                  <rect x={0} y={0} width={100} height={120} fill={item.partner.color} />
                  <image
                    x={0}
                    y={0}
                    href={item?.partner?.component}
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      transform: "translateY(10px)",
                    }}
                  />
                </g>
              )}
            </g>
          ))
        /*: !loading && (
            <g>
              <text x={CENTER_MAP.x} y={CENTER_MAP.y} fontSize="30" fill="#ddd" textAnchor="middle">
                sorry, we could not load the map
              </text>
            </g>
          )*/
      }
    </>
  );
};

export default Buildings;
