import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import useResizeObserver from "use-resize-observer";

import CircularProgress from "@mui/material/CircularProgress";
import { Add, Remove, CropFree, Numbers, ShareOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

import Tooltip from "components/atoms/tooltip";
import Button from "components/atoms/buttons/base";
import Buildings from "./buildings";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";
import { useTour } from "@reactour/tour";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import { MapContext } from "pages/home";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MapBg from "./bg";
import useAlert from "hooks/alertProvider/useAlert";
import CustomTooltip from "components/atoms/materialTooltip";

const MAX_ZOOM = 1.5;
const PATH_GRID = 200;
const SVG_SIZE = { width: 1200, height: 1200 };
const CENTER_MAP = { x: 600, y: 950 };

const isMobile = navigator.userAgent.includes("Mobi");

const InteractiveMap = () => {
  const { setListGames, setListCampaings, setBuildingBg, map } = useContext(MapContext);

  const { lang } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const Viewer = useRef<any>(null);
  const { t } = useTranslation();
  const { setIsOpen, setCurrentStep } = useTour();
  const { setAlert } = useAlert();

  const { ref, width, height } = useResizeObserver();
  const [value, setValue] = useState<any>({});
  const [tool, setTool] = useState<any>(TOOL_AUTO);
  const [tooltipData, setTooltipData] = useState({ visible: false, text: "" });
  const [loading, setLoading] = useState(true);
  const [activeUrlCoords, setActiveUrlCoords] = useState(false);

  //const [showMap, setShowMap] = useState<boolean>(true);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);

  const [renderGrid, setRenderGrid] = useState<ReactElement[]>([]);
  const [gridConfig, setGridConfig] = useState<{
    originX: number;
    originY: number;
    width: number;
    height: number;
  }>({ originX: 0, originY: 0, width: 0, height: 0 });

  const leaderboardData = useSelector(getLeaderboard);

  const devMode = process.env.REACT_APP_NODE_ENV === "development";

  // calculate grid data ---
  const _drawGrid = () => {
    const renderGrid = [];
    for (let y = 0; y < gridConfig.height; y++) {
      for (let x = 0; x < gridConfig.width; x++) {
        const posX = x * (PATH_GRID / 2) + gridConfig.originX;
        const posY =
          x % 2 ? y * (PATH_GRID / 2) + PATH_GRID / 4 + gridConfig.originY : y * (PATH_GRID / 2) + gridConfig.originY;

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
          stroke={map?.gridColor ? map?.gridColor : "#ba00fb"}
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
  }, [gridConfig, showNumbers, map?.gridColor]);

  const _drawCentralGuide = () => {
    return (
      <g>
        <rect
          x="0"
          y="0"
          width={SVG_SIZE.width}
          height={SVG_SIZE.height}
          stroke="yellow"
          strokeWidth="1px"
          fill="transparent"
        />

        {/*<line
          x1="0"
          y1={CENTER_MAP.y}
          x2={SVG_SIZE.width}
          y2={CENTER_MAP.y}
          stroke="yellow"
          strokeWidth="1px"
        />
        <line
          x1={CENTER_MAP.x}
          y1="0"
          x2={CENTER_MAP.x}
          y2={SVG_SIZE.height}
          stroke="yellow"
          strokeWidth="1px"
        />*/}
      </g>
    );
  };

  // events ---
  const _zoomIn = () => Viewer.current?.zoomOnViewerCenter(1.1);

  const _zoomOut = () => Viewer.current?.zoomOnViewerCenter(0.9);

  const _fitCenter = () => {
    Viewer.current?.fitToViewer("center", "center");
  };

  const _share = () => {
    const x = ((value?.viewerWidth / 2 - value.e) / value.a)?.toFixed(0);
    const y = ((value?.viewerHeight / 2 - value.f) / value.a)?.toFixed(0);
    const z = value?.a?.toFixed(3);
    const url = `${window.location.origin}/${lang}/home/${map.code}/?@=${x},${y},${z}`;
    navigator.clipboard.writeText(url);
    setAlert("Copy to clipboard", "success");
  };

  const _fitSelection = () => {
    const searchValue = searchParams.get("@") || map?.mapCoordinates;
    if (searchValue) {
      const [x, y, z] = searchValue.split(",");
      Viewer.current?.setPointOnViewerCenter(x, y, parseFloat(z));
    } else {
      Viewer.current?.fitToViewer("center", "center");
    }
  };

  const handlerBuildingClick = (games: any, campaings: any, code: string, background: any) => {
    setListGames(games);
    setListCampaings(campaings);
    setBuildingBg(background);
    setTooltipData({ visible: false, text: "" });
    if (games?.length || campaings?.length) {
      navigate(`/${lang}/home/${map.code}/${code}`);
    }
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
      setTimeout(() => _fitSelection(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Viewer.current?.fitToViewer, height, width, map?.buildings]);

  useEffect(() => {
    if (!loading && leaderboardData && !leaderboardData?.hideGuide) {
      setTimeout(() => {
        setCurrentStep(0);
        setIsOpen(true);
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, leaderboardData]);

  useEffect(() => {
    calculateGrid(value);

    if (!value?.focus && !loading && !isMobile && activeUrlCoords) {
      const x = ((value?.viewerWidth / 2 - value.e) / value.a)?.toFixed(0);
      const y = ((value?.viewerHeight / 2 - value.f) / value.a)?.toFixed(0);
      const z = value?.a?.toFixed(3);

      if (x && y && z) navigate({ search: `?@=${x},${y},${z}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
          <CustomTooltip title="Zoom In" placement="left-start">
            <Add />
          </CustomTooltip>
        </Button>
        <Button onClick={_zoomOut}>
          <CustomTooltip title="Zoom Out" placement="left-start">
            <Remove />
          </CustomTooltip>
        </Button>
        <Button onClick={_fitCenter}>
          <CustomTooltip title="Fit Center" placement="left-start">
            <CropFree />
          </CustomTooltip>
        </Button>
        <Button onClick={_share}>
          <CustomTooltip title="Share Map" placement="left-start">
            <ShareOutlined />
          </CustomTooltip>
        </Button>
        {devMode && (
          <Button onClick={() => setShowNumbers((prev) => !prev)}>
            <CustomTooltip title="Map Anchor Address" placement="left-start">
            <Numbers />
            </CustomTooltip>
          </Button>
        )}
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
          scaleFactorMin={isMobile ? 0.1 : 0.3}
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
          preventPanOutside={false}
          onPan={() => setActiveUrlCoords(true)}
          onZoom={() => setActiveUrlCoords(true)}
        >
          <svg width={SVG_SIZE.width} height={SVG_SIZE.height}>
            {map?.svg && (
              <g className="bg">
                <MapBg CENTER_MAP={CENTER_MAP} />
              </g>
            )}
            <g className="grid">{renderGrid}</g>
            <g className={styled.buildings}>
              <Buildings
                handlerBuildingClick={handlerBuildingClick}
                handlerOver={handlerOver}
                handlerLeave={handlerLeave}
                setLoading={setLoading}
                loading={loading}
                PATH_GRID={PATH_GRID}
                CENTER_MAP={CENTER_MAP}
              />
            </g>

            {false && _drawCentralGuide()}
          </svg>
        </ReactSVGPanZoom>
      </Box>

      <Tooltip {...tooltipData} />
    </Box>
  );
};

export default InteractiveMap;
