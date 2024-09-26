import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Box, ButtonBase, Fade, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "./styled.module.scss";

import iconMap from "assets/icons/iconMap.svg";
import { MapContext } from "pages/home";

const MapItem = ({ thumbnail, title, description, active, onClick }: any) => {
  return (
    <ButtonBase className={`${styled.item} ${active ? styled.active : ""}`} onClick={onClick}>
      <img src={(thumbnail?.length && thumbnail[0]?.url) || iconMap} alt="icon" width={66} height={66} loading="lazy" />
      <Box>
        <Typography className={styled.title}>{title || "- no title -"}</Typography>
        <Typography className={styled.desc}>{description || ""}</Typography>
      </Box>
      <ArrowForwardIosIcon width={36} />
    </ButtonBase>
  );
};

const ListMaps = ({ goToMap }: any) => {
  const { lang } = useParams();
  const { listMaps, map: activeMap, setMap } = useContext(MapContext);
  const navigate = useNavigate();

  const handleMap = (map: any) => {
    setMap(map);
    goToMap();
    if (map?.mapCoordinates) {
      navigate(`/${lang}/home/${map.code}?@=${map.mapCoordinates}`);
    } else {
      navigate(`/${lang}/home/${map.code}`);
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box className={styled.main} p={1}>
        <Stack>
          {listMaps.map((map: any, pos: number) => (
            <MapItem key={pos} {...map} onClick={() => handleMap(map)} active={activeMap?.code === map?.code} />
          ))}
        </Stack>
      </Box>
    </Fade>
  );
};
export default ListMaps;
