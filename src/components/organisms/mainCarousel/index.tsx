import { useContext } from "react";
import { Box, Modal } from "@mui/material";

import Grow from "@mui/material/Grow";

import GameCampaingCarousel from "./carousel";
import { MapContext } from "pages/home";

import Button from "components/atoms/buttons/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styled from "./styled.module.scss";
import { useTranslation } from "react-i18next";

const MainCarousel = ({ handleClose }: any) => {
  const { t } = useTranslation();
  const { setGame, listGames, setCampaing, listCampaings } = useContext(MapContext);
  const open = !!listGames?.length || !!listCampaings?.length || false;

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") handleClose();
  };

  return (
    <Modal open={open} className={styled.modalContainer} onClose={onClose}>
      <>
        <Box className={styled.backButton}>
          <Button onClick={(evt: any) => onClose(evt, "close")}>
            <ArrowBackIcon /> {t("back")}
          </Button>
        </Box>

        <Grow in={open}>
          <Box className={styled.modal}>
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

export default MainCarousel;
