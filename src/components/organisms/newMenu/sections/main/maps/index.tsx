import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Box, ButtonBase, Fade, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "./styled.module.scss";

import iconMap from "assets/icons/iconMap.svg";
import { MapContext } from "pages/home";

const MapItem = ({ thumbnail, title, description, active, onClick }: any) => {
  return (
    <ButtonBase className={`${styled.item} ${active ? styled.active : ""}`} onClick={onClick}>
      <img src={thumbnail[0]?.url || iconMap} alt="icon" width={66} height={66} loading="lazy" />
      <Box>
        <Typography className={styled.title}>{title || "- no title -"}</Typography>
        <Typography className={styled.desc}>{description || ""}</Typography>
      </Box>
      <ArrowForwardIosIcon width={36} />
    </ButtonBase>
  );
};

const ListMaps = () => {
  const { lang } = useParams();
  const { listMaps, map: activeMap, setMap } = useContext(MapContext);

  const handleMap = (map: any) => {
    setMap(map);
    window.history.replaceState(null, "", `/${lang}/home/${map.code}`);
  };

  return (
    <Fade in={true} timeout={500}>
      <Box className={styled.main} p={1}>
        <Stack>
          {listMaps.map((map: any, pos: number) => (
            <MapItem
              key={pos}
              {...map}
              onClick={() => handleMap(map)}
              active={activeMap?.code === map?.code}
            />
          ))}
        </Stack>
      </Box>
    </Fade>
  );
};
export default ListMaps;
