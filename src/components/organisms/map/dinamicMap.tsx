import { ReactElement, useEffect, useRef, useState } from "react";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import useResizeObserver from "use-resize-observer";

import MapBg from "./bg";
import { Add, Remove, CropFree, Map } from "@mui/icons-material";
import { Box } from "@mui/material";

import Tooltip from "components/atoms/tooltip";
import Button from "components/atoms/buttons/base";
import ListItems from "./items";

import styled from "./styled.module.scss";

const MAX_ZOOM = 1.2;
const PATH_GRID = 200;
const SVG_SIZE = { width: 2304, height: 2008 };
const isMobile = navigator.userAgent.includes("Mobi");

const InteractiveMap = ({ openGames, setOpenGames }: any) => {
  const Viewer = useRef<any>(null);

  const { ref, width, height } = useResizeObserver();
  const [value, setValue] = useState<any>({});
  const [tool, setTool] = useState<any>(TOOL_AUTO);
  const [tooltipData, setTooltipData] = useState({ visible: false, text: "" });

  const [showMap, setShowMap] = useState<boolean>(true);

  const [renderGrid, setRenderGrid] = useState<ReactElement[]>([]);
  const [gridConfig, setGridConfig] = useState<{
    originX: number;
    originY: number;
    width: number;
    height: number;
  }>({ originX: 0, originY: 0, width: 0, height: 0 });

  // calculate grid data ---

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
    // grid gradient opacity
    const opacity = (key.split("-")[1] / 100) * 2 + 0.5 || 0.2;
    return (
      <polygon
        key={key}
        points={`
            ${posX},${posY} 
            ${posX + PATH_GRID / 2},${posY - PATH_GRID / 4} 
            ${posX + PATH_GRID},${posY} 
            ${posX + PATH_GRID / 2},${posY + PATH_GRID / 4}
            `}
        className={styled.gridpath}
        style={{ strokeOpacity: opacity }}
      />
    );
  };

  const calculateGrid = (value: any) => {
    if (value?.mode !== "idle" && !value?.a) return;

    const posX = value?.e / value?.a;
    const posY = value?.f / value?.a;

    const marginX = PATH_GRID / 2;
    const marginY = PATH_GRID / 4;

    setGridConfig({
      originX: (posX - (posX % PATH_GRID) + marginX) * -1,
      originY: (posY - (posY % PATH_GRID) + marginY) * -1,
      width: (value?.viewerWidth + marginX) / ((PATH_GRID / 2) * value?.a),
      height: (value?.viewerHeight + marginY) / ((PATH_GRID / 2) * value?.a),
    });
  };

  useEffect(() => {
    _drawGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridConfig]);

  // events ---
  const _zoomIn = () => {
    Viewer.current?.zoomOnViewerCenter(1.1);
  };

  const _zoomOut = () => {
    Viewer.current?.zoomOnViewerCenter(0.9);
  };

  const _fitCenter = () => {
    Viewer.current?.fitToViewer("center", "center");

    // zoomIn only mobile
    if (isMobile && width && width < 500) {
      setTimeout(() => Viewer.current?.zoomOnViewerCenter(1.5), 50);
    }
  };

  const handlerClick = (id: number, evt: any) => {
    console.log("id:", id, " - target:", evt.currentTarget);
    setOpenGames(true);

    if (isMobile) {
      setShowMap(false);
    }
    setTooltipData({ visible: false, text: "" });
  };

  const handlerOver = (item: { text: any }) => {
    setTooltipData({ text: item.text, visible: true });
  };

  const handlerLeave = () => {
    setTooltipData({ visible: false, text: "" });
  };

  // window resize ---
  useEffect(() => {
    if (Viewer.current?.fitToViewer !== undefined && height && width) {
      setTimeout(() => _fitCenter(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Viewer.current?.fitToViewer, height, width]);

  useEffect(() => {
    if (!openGames && isMobile) setShowMap(true);
  }, [openGames]);

  return (
    <Box ref={ref} className={styled.main}>
      <Box className={styled.backgroundImage}></Box>

      <Box className={styled.actions}>
        <Button onClick={_zoomIn}>
          <Add />
        </Button>
        <Button onClick={_zoomOut}>
          <Remove />
        </Button>
        <Button onClick={_fitCenter}>
          <CropFree />
        </Button>
        <Button onClick={() => setShowMap((prev) => !prev)}>
          <Map />
        </Button>
      </Box>

      <Box sx={{ opacity: openGames ? 0 : 1 }}>
        <ReactSVGPanZoom
          ref={Viewer}
          value={value}
          tool={tool}
          onChangeValue={setValue}
          onChangeTool={setTool}
          width={width || 100}
          height={height || 100}
          SVGBackground={"transparent"}
          background={"transparent"}
          scaleFactorMax={MAX_ZOOM}
          scaleFactorMin={0.1}
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
          onPan={calculateGrid}
          onZoom={calculateGrid}
        >
          <svg width={SVG_SIZE.width} height={SVG_SIZE.height}>
            {<g className="grid">{renderGrid}</g>}
            {showMap && (
              <g className={styled.map}>
                <g className={styled.bg}>
                  <MapBg id="mainSVG" />
                </g>
                <g className={styled.items}>
                  <ListItems
                    handlerClick={handlerClick}
                    handlerOver={handlerOver}
                    handlerLeave={handlerLeave}
                  />
                </g>
              </g>
            )}
          </svg>
        </ReactSVGPanZoom>
      </Box>

      <Tooltip {...tooltipData} />
    </Box>
  );
};

export default InteractiveMap;