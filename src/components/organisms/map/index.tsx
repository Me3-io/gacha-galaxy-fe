import { ReactElement, useEffect, useRef, useState } from "react";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import useResizeObserver from "use-resize-observer";

import MapBg from "./bg";
import { Add, Remove, CropFree, GridView, Map } from "@mui/icons-material";
import { Box } from "@mui/material";
import menu from "assets/icons/menu.svg";

import Tooltip from "components/atoms/tooltip";
import Button from "components/atoms/button";
import ListItems from "./items";
import GameMachines from "../gameMachines";

import styled from "./styled.module.scss";

const MAX_ZOOM = 1.2;
const PATH_GRID = 200;
const SVG_SIZE = { width: 1728, height: 1506 };

const InteractiveMap = ({ openDrawer, setOpenDrawer }: any) => {
  const Viewer = useRef<any>(null);

  const { ref, width, height } = useResizeObserver();
  const [value, setValue] = useState<any>({});
  const [tool, setTool] = useState<any>(TOOL_AUTO);
  const [tooltipData, setTooltipData] = useState({ visible: false, text: "" });
  const [openGames, setOpenGames] = useState(false);

  // grid
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [renderGrid, setRenderGrid] = useState<ReactElement[]>([]);
  const [gridConfig, setGridConfig] = useState<{
    originX: number;
    originY: number;
    width: number;
    height: number;
  }>({ originX: 0, originY: 0, width: 0, height: 0 });

  // calculate grid data ---
  useEffect(() => {
    setGridConfig({
      originX: (SVG_SIZE.width / 2) * -1,
      originY: (SVG_SIZE.height / 2) * -1,
      width: SVG_SIZE.width / (PATH_GRID / 4),
      height: SVG_SIZE.height / (PATH_GRID / 4),
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
    // grid gradient opacity
    const opacity = (key.split("-")[1] / 100) * 2 + 0.1 || 0.2;
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

  // events ---
  const _zoomIn = () => {
    Viewer.current?.zoomOnViewerCenter(1.1);
  };

  const _zoomOut = () => {
    Viewer.current?.zoomOnViewerCenter(0.9);
  };

  const _fitCenter = () => {
    Viewer.current?.fitToViewer("center", "center");
  };

  const handlerClick = (id: number, evt: any) => {
    console.log("id:", id, " - target:", evt.currentTarget);
    setOpenGames(true);
  };

  const handlerOver = (item: { text: any }) => {
    setTooltipData({ text: item.text, visible: true });
  };

  const handlerLeave = () => {
    setTooltipData({ visible: false, text: "" });
  };

  const handleCloseModal = (evt: any, reason: string) => {
    //if (reason !== "backdropClick") {
    setOpenGames(false);
    // }
  };

  // window resize ---
  useEffect(() => {
    if (Viewer.current?.fitToViewer !== undefined && height && width) {
      setTimeout(() => _fitCenter(), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Viewer.current?.fitToViewer, height, width]);

  // fit on openDrawer  ---
  /*useEffect(() => {
    _fitCenter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDrawer]);*/

  return (
    <Box
      ref={ref}
      className={styled.mainBG}
      style={{ height: "100%", width: "100%", paddingLeft: openDrawer ? "400px" : "0" }}
    >
      <Box className={styled.backgroundImage}></Box>

      <Box p={2} className={styled.menuIcon}>
        <Box component="span" onClick={() => setOpenDrawer(true)}>
          <img src={menu} alt="menu" width={36} />
        </Box>
      </Box>

      <Box className={styled.actionsTest}>
        <Button onClick={() => setShowGrid((prev) => !prev)}>
          <GridView />
        </Button>
        <Button onClick={() => setShowMap((prev) => !prev)}>
          <Map />
        </Button>
      </Box>

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
      </Box>

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
      >
        <svg width={SVG_SIZE.width} height={SVG_SIZE.height}>
          <g className="grid">{showGrid && renderGrid}</g>
          <g className={styled.map}>
            <g className={styled.bg}>
              {showMap && <MapBg id="mainSVG" />}
            </g>
            <g className={styled.items}>
              {
                <ListItems
                  handlerClick={handlerClick}
                  handlerOver={handlerOver}
                  handlerLeave={handlerLeave}
                />
              }
            </g>
          </g>
        </svg>
      </ReactSVGPanZoom>

      <Tooltip {...tooltipData} />

      <GameMachines open={openGames} handleClose={handleCloseModal} />
    </Box>
  );
};

export default InteractiveMap;
