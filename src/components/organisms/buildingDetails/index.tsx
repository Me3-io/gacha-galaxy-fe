import { useContext } from "react";
import { Box, Grid, Grow, Modal } from "@mui/material";

import Partner from "./partner";

import { MapContext } from "pages/home";

import Button from "components/atoms/buttons/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTranslation } from "react-i18next";
import bg from "assets/images/playroom.png";
import styled from "./styled.module.scss";
import MiniCard from "./carousel/miniCard";

const BuildingDetails = ({ handleClose }: any) => {
  const { t } = useTranslation();
  const { setGame, listGames, listCampaings, buildingData } = useContext(MapContext);
  const open = !!listGames?.length || !!listCampaings?.length || false;

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") handleClose();
  };

  return (
    <Modal open={open} className={styled.modalContainer} onClose={onClose}>
      <>
        <Box className={styled.background} sx={{ backgroundImage: `url(${buildingData?.background?.url || bg})` }} />

        <Box className={styled.backButton}>
          <Button onClick={(evt: any) => onClose(evt, "close")}>
            <ArrowBackIcon /> {t("back")}
          </Button>
        </Box>

        <Grow in={open} timeout={1000}>
          <Box className={styled.modal}>
            <Grid container className={styled.back}>
              <Partner buildingData={buildingData} />
              <Grid
                container
                spacing={6}
                sx={{
                  justifyContent: "center",
                  paddingTop: 6,
                  marginTop: "-20px !important",
                  width: "1200px",
                  height: "340px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {listGames?.map((item: any) => (
                  <Grid item xs={12} sm={6} md={3.5} key={item.code}>
                    <MiniCard item={item} setDetails={setGame} type={item.type} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grow>
      </>
    </Modal>
  );
};

export default BuildingDetails;
