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
  setLoading,
}: any) => {
  const buildingsData = useSelector(getBuildings);
  const [buildings, setBuildings] = useState<any>([]);

  // events ---
  const handlerBuilding = (evt: any, item: any) => {
    evt.stopPropagation();
    item.games && handlerBuildingClick(item.games);
  };

  const handlerPartner = (evt: any, item: any) => {
    evt.stopPropagation();
    item?.campaign && handlerPartnerClick(item.campaign.claimrId);
  };


  // data buildings ---
  const getResource = async (url: string) => {
    return await fetch(url)
      .then((res) => res.blob())
      .then((res) => URL.createObjectURL(res))
      .catch((error) => console.error("error: " + error.message));
  };

  const loadBuildings = (buildings: any[]) => {
    setLoading(true);

    const data = buildings.map(async (item: any) => ({
      position: calculatePosition(item.anchorAddress, item.offset),
      order: {
        x: item?.anchorAddress ? parseInt(item.anchorAddress.split(",")[0]) : 0,
        y: item?.anchorAddress ? parseInt(item.anchorAddress.split(",")[1]) : 0,
      },
      img: item?.svg[0],
      component: await getResource(item?.svg[0].url),
      scale: item.scale || 1,
      name: item.name || "",
      opacity: item.alpha || 1,
      partner: item.partner
        ? {
            name: item.partner.displayName,
            img: item.partner.logo[0],
            component: await getResource(item.partner.logo[0].url),
            color: item.partner.bGColor || "transparent",
            orientation: item.partnerOrientation === "LEFT" ? 26.5 : -26.5,
            scale: item.partnerScale || 1,
            position: {
              x: item?.partnerOffset
                ? parseInt(item.partnerOffset.split(",")[0]) - item.svg[0].width
                : 0,
              y: item?.partnerOffset
                ? parseInt(item.partnerOffset.split(",")[1]) - item.svg[0].height
                : 0,
            },
          }
        : null,
      games: item.games,
      campaign: item.campaign,
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
    if (buildingsData) loadBuildings(buildingsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingsData]);

  return (
    <>
      {buildings.map((item: any, pos: number) => (
        <g
          key={pos}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          onClick={(evt) => handlerBuilding(evt, item)}
          onTouchEnd={(evt) => evt.stopPropagation()}
        >
          <image
            style={{ cursor: item.games ? "pointer" : "default", opacity: item.opacity }}
            x={item.img.width * -1}
            y={item.img.height * -1}
            href={item.component}
            //href={item.img.url}
            onMouseMove={() => handlerOver(item.name)}
            onMouseLeave={handlerLeave}
          />

          {item.partner && (
            <g
              onClick={(evt) => handlerPartner(evt, item)}
              transform={`translate(${item.partner.position.x} ${item.partner.position.y}) scale(${item.partner.scale}) skewY(${item.partner.orientation})`}
              onMouseMove={() => handlerOver(item.partner.name)}
              onMouseLeave={handlerLeave}
              onTouchEnd={(evt) => evt.stopPropagation()}
            >
              <rect
                x={0}
                y={0}
                width={100}
                height={100}
                fill={item.partner.color}
              />
              <image
                x={0}
                y={0}
                //href={item.partner.img.url}
                href={item.partner.component}
                style={{ cursor: "pointer", width: "100px" }}
              />
            </g>
          )}
        </g>
      ))}
    </>
  );
};

export default Buildings;
