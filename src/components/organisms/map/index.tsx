import { ReactElement, useEffect, useRef, useState } from "react";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import useResizeObserver from "use-resize-observer";

import CircularProgress from "@mui/material/CircularProgress";
import { Add, Remove, CropFree, /*Map,*/ Numbers } from "@mui/icons-material";
import { Box } from "@mui/material";

import Tooltip from "components/atoms/tooltip";
import Button from "components/atoms/buttons/base";
import Buildings from "./buildings";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";

const MAX_ZOOM = 1.5;
const PATH_GRID = 200;
const SVG_SIZE = { width: 1200, height: 1200 };
const CENTER_MAP = { x: 600, y: 950 };

const isMobile = navigator.userAgent.includes("Mobi");

const InteractiveMap = ({ setGames, setCampaing }: any) => {
  const Viewer = useRef<any>(null);
  const { t } = useTranslation();

  const { ref, width, height } = useResizeObserver();
  const [value, setValue] = useState<any>({});
  const [tool, setTool] = useState<any>(TOOL_AUTO);
  const [tooltipData, setTooltipData] = useState({ visible: false, text: "" });
  const [loading, setLoading] = useState(true);

  //const [showMap, setShowMap] = useState<boolean>(true);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);

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
    //const opacity = (key.split("-")[1] / 100) * 2 + 0.5 || 0.2;
    return (
      <g key={key}>
        {showNumbers && (
          <text x={posX + 20} y={posY + 5} fill="#db74ff99" fontSize="12">
            {(posX - CENTER_MAP.x) / 100},{(posY - CENTER_MAP.y) / 50}
          </text>
        )}
        <polygon
          points={`
            ${posX},${posY} 
            ${posX + PATH_GRID / 2},${posY - PATH_GRID / 4} 
            ${posX + PATH_GRID},${posY} 
            ${posX + PATH_GRID / 2},${posY + PATH_GRID / 4}
            `}
          className={styled.gridpath}
          //style={{ strokeOpacity: opacity }}
        />
      </g>
    );
  };

  const calculateGrid = (value: any) => {
    if (value?.mode !== "idle" && !value?.a) return;
    setTooltipData({ visible: false, text: "" });

    const posX = value?.e / value?.a;
    const posY = value?.f / value?.a;
    const margin = PATH_GRID / 2;

    setGridConfig({
      originX: (posX - (posX % PATH_GRID) + margin) * -1,
      originY: (posY - (posY % PATH_GRID) + margin) * -1,
      width: (value?.viewerWidth + margin) / ((PATH_GRID / 2) * value?.a),
      height: (value?.viewerHeight + margin * 2) / ((PATH_GRID / 2) * value?.a),
    });
  };

  useEffect(() => {
    _drawGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridConfig, showNumbers]);

  const _drawCentralGuide = () => {
    return (
      <g>
        <rect
          x="0"
          y="0"
          width={SVG_SIZE.width}
          height={SVG_SIZE.height}
          stroke="red"
          strokeWidth="1px"
          fill="transparent"
        />

        <line
          x1="0"
          y1={CENTER_MAP.y}
          x2={SVG_SIZE.width}
          y2={CENTER_MAP.y}
          stroke="red"
          strokeWidth="1px"
        />
        <line
          x1={CENTER_MAP.x}
          y1="0"
          x2={CENTER_MAP.x}
          y2={SVG_SIZE.height}
          stroke="red"
          strokeWidth="1px"
        />
      </g>
    );
  };

  // events ---
  const _zoomIn = () => Viewer.current?.zoomOnViewerCenter(1.1);

  const _zoomOut = () => Viewer.current?.zoomOnViewerCenter(0.9);

  const _fitCenter = () => {
    Viewer.current?.fitToViewer("center", "center");

    // zoomIn only mobile
    /*if (isMobile && width && width < 500) {
      setTimeout(() => Viewer.current?.zoomOnViewerCenter(1.5), 50);
    }*/
  };

  const handlerBuildingClick = (games: number) => {
    setGames({ open: true, data: games });
    setTooltipData({ visible: false, text: "" });
  };

  const handlerPartnerClick = (claimrId: any) => {
    setCampaing({ open: true, id: claimrId });
  };

  const handlerOver = (text: any) => {
    setTooltipData({ text: text, visible: true });
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

  /*useEffect(() => {
    if (!openGames && isMobile) setShowMap(true);
  }, [openGames]);*/

  return (
    <Box ref={ref} className={styled.main}>
      {loading && (
        <Box className={styled.loading}>
          <CircularProgress className={styled.spinner} size={36} />
          {t("loading-map")}
        </Box>
      )}
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
        {/*<Button onClick={() => setShowMap((prev) => !prev)}>
          <Map />
        </Button>*/}
        <Button onClick={() => setShowNumbers((prev) => !prev)}>
          <Numbers />
        </Button>
      </Box>

      <Box>
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
          scaleFactorMin={isMobile ? 0.1 : 0.4}
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
          //onClick={(evt) => console.log("click", evt)}
        >
          <svg width={SVG_SIZE.width} height={SVG_SIZE.height}>
            <g className="grid">{renderGrid}</g>

            {
              /*showMap && (*/
              <g className={styled.buildings}>
                <Buildings
                  handlerBuildingClick={handlerBuildingClick}
                  handlerPartnerClick={handlerPartnerClick}
                  handlerOver={handlerOver}
                  handlerLeave={handlerLeave}
                  setLoading={setLoading}
                  PATH_GRID={PATH_GRID}
                  CENTER_MAP={CENTER_MAP}
                />
              </g>
              /*)*/
            }

            {false && _drawCentralGuide()}
          </svg>
        </ReactSVGPanZoom>
      </Box>

      <Tooltip {...tooltipData} />
    </Box>
  );
};

export default InteractiveMap;
