import { useContext } from "react";
import { Box, Grow, Modal } from "@mui/material";

import GameCampaingCarousel from "./carousel";
import Partner from "./partner";

import { MapContext } from "pages/home";

import Button from "components/atoms/buttons/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTranslation } from "react-i18next";
import bg from "assets/images/playroom.png";
import styled from "./styled.module.scss";

const BuildingDetails = ({ handleClose }: any) => {
  const { t } = useTranslation();
  const { setGame, listGames, setCampaing, listCampaings, buildingData } = useContext(MapContext);
  const open = !!listGames?.length || !!listCampaings?.length || false;

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") handleClose();
  };

  return (
    <Modal open={open} className={styled.modalContainer} onClose={onClose}>
      <>
        <Box className={styled.background} sx={{ backgroundImage: `url(${buildingData?.url || bg})` }} />

        <Box className={styled.backButton}>
          <Button onClick={(evt: any) => onClose(evt, "close")}>
            <ArrowBackIcon /> {t("back")}
          </Button>
        </Box>

        <Grow in={open} timeout={1000}>
          <Box className={styled.modal}>
            <Partner buildingData={buildingData} />
            <GameCampaingCarousel
              listGames={listGames || []}
              listCampaings={listCampaings || []}
              setGame={setGame}
              setCampaing={setCampaing}
            />
          </Box>
        </Grow>
      </>
    </Modal>
  );
};

export default BuildingDetails;
