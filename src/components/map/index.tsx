import { useEffect, useRef, useState } from "react";

import useResizeObserver from "use-resize-observer";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader } from "react-svg-pan-zoom-loader";
import waitForElement from "../../hooks/waitForElement";

import mapBG from "../../assets/images/tokyo_bg.svg";
import styled from "./styled.module.scss";

const MAX_ZOOM = 1;
const PATH_GRID = 200;

const InteractiveMap = () => {
  const Viewer = useRef<any>(null);

  const { ref, width, height } = useResizeObserver();
  const [svgMap, setSvgMap] = useState(false);

  const [value, setValue] = useState<any>();
  const [tool, setTool] = useState<any>(TOOL_AUTO);
  const [svgDimensions, setSvgDimensions] = useState({ width: 1024, height: 1024 });
  const [showGrid, setShowGrid] = useState(true);

  // grid
  const [renderGrid, setRenderGrid] = useState<any[]>([]);
  const [gridConfig, setGridConfig] = useState({ originX: 0, originY: 0, width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = (event: any) => {
      setSvgMap(true);
      const { naturalWidth, naturalHeight } = event.target;
      setSvgDimensions({ width: naturalWidth, height: naturalHeight });
      waitForElement(".injected-svg").then(() => _fitCenter());
    };

    img.src = mapBG;
    _drawGrid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calculate grid data ---
  useEffect(() => {
    setGridConfig({
      originX: 0,
      originY: PATH_GRID / 4,
      width: svgDimensions.width / (PATH_GRID / 2) - 2,
      height: svgDimensions.height / (PATH_GRID / 2) - 1,
    });
  }, [svgDimensions.width, svgDimensions.height]);

  useEffect(() => {
    _drawGrid();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridConfig.width, gridConfig.height]);

  // grid events ---
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
      <>
        <text x={posX + 10} y={posY + 2} fill="#fff" font-size="6">
          {posX} - {posY - PATH_GRID / 4}
        </text>
        <polygon
          key={key}
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
      </>
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
    Viewer.current?.fitToViewer("center", "center");
  };

  if (!svgMap) {
    return (
      <div>
        <span>loading map...</span>
      </div>
    );
  }

  return (
    <div ref={ref} className="main" style={{ height: "100%", width: "100%" }}>
      <div className={styled.actions}>
        <button onClick={_zoomIn}>zoom in</button>
        <button onClick={_zoomOut}>zoom out</button>
        <button onClick={_fitCenter}>center</button>
        <button onClick={() => setShowGrid((prev) => !prev)}>show grid</button>
      </div>
      <ReactSvgPanZoomLoader
        src={mapBG}
        render={(renderMap) => {
          return (
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
              scaleFactorMin={0.5}
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
              <svg width={svgDimensions.width} height={svgDimensions.height}>
                {renderMap}
                {showGrid && <g>{renderGrid}</g>}
              </svg>
            </ReactSVGPanZoom>
          );
        }}
      />
    </div>
  );
};

export default InteractiveMap;
