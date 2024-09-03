import { useContext, useEffect, useState } from "react";
import { MapContext } from "pages/home";

import styled from "./styled.module.scss";

const MapBg = ({ CENTER_MAP }: any) => {
  const { map } = useContext(MapContext);
  const [component, setComponent] = useState<string | null>(null);

  const position = {
    x: parseInt(map?.offset.split(",")[0]) || 0,
    y: parseInt(map?.offset.split(",")[1]) || 0,
  };

  const getResource = async (url: string) => {
    return await fetch(url)
      .then((res) => res.blob())
      .then((res) => URL.createObjectURL(res))
      .catch((error) => console.error("error: " + error.message));
  };

  useEffect(() => {
    if (map) {
      const _load = async () => {
        const component = await getResource(map?.svg[0].url);
        if (component) setComponent(component);
      };
      _load();
    }
  }, [map]);

  return (
    <>
      {component && (
        <g
          transform={`translate(${position.x} ${position.y}) scale(${map?.scale})`}
          className={styled.bg}
        >
          <image
            style={{ opacity: map.alpha }}
            x={map.img.width}
            y={map.img.height}
            href={component}
          />
        </g>
      )}
    </>
  );
};
export default MapBg;
