import { useEffect, useRef, useState } from "react";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import useResizeObserver from "use-resize-observer";
import waitForElement from "utils/waitForElement";

import MapTokyoBg from "assets/images/tokyo_bg";
import styled from "./styled.module.scss";

const MAX_ZOOM = 2;
const PATH_GRID = 200;
const SVG_SIZE = { width: 2304, height: 1489 };
const ID_MAP = "svg-tokyo-map";

const InteractiveMap = () => {
  const Viewer = useRef<any>(null);

  const { ref, width, height } = useResizeObserver();
  const [value, setValue] = useState<any>({});
  const [tool, setTool] = useState<any>(TOOL_AUTO);

  // grid
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [renderGrid, setRenderGrid] = useState<any[]>([]);
  const [gridConfig, setGridConfig] = useState({ originX: 0, originY: 0, width: 0, height: 0 });

  // calculate grid data and events ---
  useEffect(() => {
    setGridConfig({
      originX: 0,
      originY: PATH_GRID / 4,
      width: SVG_SIZE.width / (PATH_GRID / 2) - 2,
      height: SVG_SIZE.height / (PATH_GRID / 2) - 1,
    });
  }, []);

  useEffect(() => {
    _drawGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridConfig.width, gridConfig.height]);

  const _drawGrid = () => {
    const renderGrid = [];
    for (let y = 0; y < gridConfig.height; y++) {
      for (let x = 0; x < gridConfig.width; x++) {
        const posX = x * (PATH_GRID / 2) + gridConfig.originX;
        const posY =
          x % 2
            ? y * (PATH_GRID / 2) + PATH_GRID / 4 + gridConfig.originY
            : y * (PATH_GRID / 2) + gridConfig.originY;

        const key = `${x}-${y}`;
        const item = { key, posX, posY };

        renderGrid.push(_drawPath(item));
      }
    }
    setRenderGrid(renderGrid);
  };

  const _drawPath = ({ key, posX, posY }: any) => {
    return (
      <g key={key}>
        <text x={posX + 10} y={posY + 2} fill="#fff" fontSize="6">
          {posX} - {posY - PATH_GRID / 4}
        </text>
        <polygon
          points={`
            ${posX},${posY} 
            ${posX + PATH_GRID / 2},${posY - PATH_GRID / 4} 
            ${posX + PATH_GRID},${posY} 
            ${posX + PATH_GRID / 2},${posY + PATH_GRID / 4}
            `}
          //onClick={_pathClick}
          //onMouseOver={_pathMouseOver}
          //onMouseLeave={_pathMouseLeave}
          className={styled.gridpath}
        />
      </g>
    );
  };

  // zoom events ---
  const _zoomIn = () => {
    Viewer.current?.zoomOnViewerCenter(1.1);
  };

  const _zoomOut = () => {
    Viewer.current?.zoomOnViewerCenter(0.9);
  };

  const _fitCenter = () => {
    //Viewer.current?.fitToViewer("center");
    //const posTop = height && SVG_SIZE.height > height ? (SVG_SIZE.height - height) / 4 : 0;
    Viewer.current?.fitSelection(0, 0, SVG_SIZE.width, 0);
  };

  // window resize ---
  useEffect(() => {
    if (Viewer.current?.fitSelection !== undefined && height && width) {
      waitForElement(`#${ID_MAP}`).then(() => _fitCenter());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Viewer.current?.fitSelection, height, width]);

  return (
    <div ref={ref} className="main" style={{ height: "100%", width: "100%" }}>
      <div className={styled.actions}>
        <button onClick={_zoomIn}>zoom in</button>
        <button onClick={_zoomOut}>zoom out</button>
        <button onClick={_fitCenter}>center</button>
        <button onClick={() => setShowGrid((prev) => !prev)}>show grid</button>
        <button onClick={() => setShowMap((prev) => !prev)}>show map</button>
      </div>

      <ReactSVGPanZoom
        ref={Viewer}
        value={value}
        tool={tool}
        onChangeValue={setValue}
        onChangeTool={setTool}
        width={width || 100}
        height={height || 100}
        SVGBackground={"transparent"}
        background={"#000000cc"}
        scaleFactorMax={MAX_ZOOM}
        scaleFactorMin={0.2}
        toolbarProps={{
          position: "none",
        }}
        miniatureProps={{
          position: "none",
          background: "#000000cc",
          width: 250,
          height: 250,
        }}
        detectAutoPan={false}
        preventPanOutside={true}
      >
        <svg width={SVG_SIZE.width} height={SVG_SIZE.height}>
          <g className="map">{showMap && <MapTokyoBg id={ID_MAP} />}</g>
          <g className="grid">{showGrid && renderGrid}</g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
};

export default InteractiveMap;
