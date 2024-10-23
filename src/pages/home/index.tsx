import { createContext, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";
import BuildingDetails from "components/organisms/buildingDetails";

import DownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useDispatch, useSelector } from "react-redux";
import { fetchMaps, getMaps } from "reduxConfig/thunks/maps";
import { fetchLeaderboard } from "reduxConfig/thunks/leaderboard";
import { fetchClaims } from "reduxConfig/thunks/claim";

//import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import { ReactTourProvider } from "hooks/reactourProvider";

import Campaign from "components/organisms/campaing";
import GameDetails from "components/organisms/gameDetails";
import MainPanel from "components/organisms/newMenu";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import NFTChekout from 'components/molecules/NFTChekout';
import KeysModal from "components/molecules/keysModal";
import NFTCheckout from "components/molecules/NFTChekout";
//import { client } from "config/thirdwebConfig";
//import { PayEmbed } from "thirdweb/react";
//import FiatCheckout from "components/molecules/fiatCheckout";

//import TourModal from "components/organisms/tour";

const initialState = {
  map: {} as any,
  game: {} as any,
  campaing: {} as any,
  listMaps: [],
  listGames: [],
  listCampaings: [],
  buildingData: {} as any,
  setMap: (map: any) => {},
  setGame: (game: any) => {},
  setCampaing: (campaing: any) => {},
  setListMaps: (maps: any) => {},
  setListGames: (games: any) => {},
  setListCampaings: (campaings: any) => {},
  setBuildingData: {} as any,
};

export const MapContext = createContext(initialState);

const Home = () => {
  //const { t } = useTranslation();
  const { lang, map: urlMap, building } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapsData = useSelector(getMaps);

  const [listMaps, setListMaps] = useState([]);
  const [listGames, setListGames] = useState([]);
  const [listCampaings, setListCampaings] = useState([]);
  const [buildingData, setBuildingData] = useState<any>({});

  const [map, setMap] = useState<any>({});
  const [game, setGame] = useState<any>({});
  const [campaing, setCampaing] = useState<any>({});
  const [openTokens, setOpenTokens] = useState(false);
  const [openNFT, setOpenNFT] = useState(false);

  const goToLeaderboard = () => window.scrollTo(0, document.body.scrollHeight);
  const goToMap = () => window.scrollTo(0, 0);

  const handleCloseTokens = () => {
    setOpenTokens(false);
  };

  const handleClose = () => {
    setListGames([]);
    setListCampaings([]);
    setBuildingData({});
    const searchValue = searchParams.get("@") || map?.mapCoordinates;
    if (searchValue) {
      navigate(`/${lang}/home/${map.code}?@=${searchValue}`);
    } else {
      navigate(`/${lang}/home/${map.code}`);
    }
  };

  useEffect(() => {
    dispatch(fetchMaps() as any);
    dispatch(fetchLeaderboard() as any);
    dispatch(fetchClaims() as any);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapsData?.length > 0) {
      setListMaps(mapsData);

      if (urlMap) {
        const map = mapsData.find((map: any) => map.code === urlMap);
        setMap(map);
        if (building) {
          const buildingDetails = map.buildings.find((item: any) => item.code === building);
          setListGames(buildingDetails?.games || []);
          setListCampaings(buildingDetails?.campaigns || []);
          setBuildingData({
            partner:
              buildingDetails.partner && buildingDetails.partner?.logo?.length
                ? {
                    name: buildingDetails.partner.displayName,
                    website: buildingDetails.partner.website,
                    description: buildingDetails?.partner?.description,
                    img: buildingDetails.partner.logo[0],
                  }
                : null,
            background: (buildingDetails?.background?.length && buildingDetails?.background[0]) || {},
          });
        }
      } else {
        setMap(mapsData[0]);
        navigate(mapsData[0].code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapsData, urlMap]);

  return (
    <ReactTourProvider>
      <MapContext.Provider
        value={{
          map,
          game,
          campaing,
          listMaps,
          listGames,
          listCampaings,
          buildingData,
          setMap,
          setGame,
          setCampaing,
          setListMaps,
          setListGames,
          setListCampaings,
          setBuildingData,
        }}
      >
        <Layout showHelp={true}>
          <Container maxWidth={false} disableGutters={true}>
            <Grid container>
              <Grid item xs={12}>
                <Box height={"100%"} overflow={"hidden"}>
                  <InteractiveMap />
                </Box>

                <Box display={{ xs: "none", md: "flex" }}>
                  <MainPanel showBack={false} goToMap={goToMap} setOpenTokens={setOpenTokens} />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box display={{ xs: "flex", md: "none" }} height={"100svh"}>
                  <Box className={styled.downIcon} onClick={goToLeaderboard}>
                    <span>Menu</span>
                    <DownIcon />
                  </Box>

                  <MainPanel showBack={true} goToMap={goToMap} setOpenTokens={setOpenTokens} />
                </Box>
              </Grid>
            </Grid>

            <BuildingDetails handleClose={handleClose} />

            <GameDetails />
            <Campaign />

            {/* subsection NFTChekout */}
            {openTokens && <KeysModal open={setOpenTokens} onClose={handleCloseTokens} openPayment={setOpenNFT} />}
            {openNFT && <NFTCheckout setOpen={setOpenNFT} />}
            {/* subsection FiatCheckout */}
            {/* openTokens && <FiatCheckout /> */}
          </Container>
        </Layout>
      </MapContext.Provider>
    </ReactTourProvider>
  );
};

export default Home;
