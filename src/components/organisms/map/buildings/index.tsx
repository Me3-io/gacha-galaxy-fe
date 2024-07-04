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

  const handlerBuilding = (evt: any, item: any) => {
    item.clickable ? handlerBuildingClick(item.games) : evt.stopPropagation();
  };

  const handlerPartner = (evt: any, item: any) => {
    item?.campaign ? handlerPartnerClick(item.campaign.claimrId) : evt.stopPropagation();
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
    if (buildingsData) {
      //console.log(buildingsData);
      const data = buildingsData.map((item: any) => ({
        position: calculatePosition(item.anchorAddress, item.offset),
        order: {
          x: parseInt(item.anchorAddress.split(",")[0]),
          y: parseInt(item.anchorAddress.split(",")[1]),
        },
        //component: await getSVG(item?.svg[0].url),
        img: item?.svg[0],
        scale: item.scale || 1,
        text: item.name || "",
        opacity: item.alpha || 1,
        clickable: !!item.gameId,
        partner: item.partner
          ? {
              name: item.partner.displayName,
              img: item.partner.logo[0],
              position: {
                x: parseInt(item.partnerPosition.split(",")[0]) - item.svg[0].width || 0,
                y: parseInt(item.partnerPosition.split(",")[1]) - item.svg[0].height || 0,
              },
            }
          : null,
        games: item.gameId,
        campaign: item.campaign,
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
          onClick={(evt) => handlerBuilding(evt, item)}
          onTouchStart={(evt) => evt.stopPropagation()}
          //dangerouslySetInnerHTML={{ __html: item.component }}
        >
          <image
            style={{ cursor: item.clickable ? "pointer" : "default", opacity: item.opacity }}
            x={item.img.width * -1}
            y={item.img.height * -1}
            href={item.img.url}
            onMouseMove={() => handlerOver(item)}
            onMouseLeave={handlerLeave}
          />

          {item.partner && (
            <g
              onClick={(evt) => handlerPartner(evt, item)}
              transform={`translate(${item.partner.position.x} ${item.partner.position.y}) scale(0.6)`}
            >
              <image x={0} y={0} href={item.partner.img.url} style={{ cursor: "pointer" }} />
            </g>
          )}
        </g>
      ))}
    </>
  );
};

export default Buildings;
