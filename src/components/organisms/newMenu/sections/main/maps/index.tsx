import { Box, ButtonBase, Fade, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "./styled.module.scss";

import iconMap from "assets/icons/iconMap.svg";

const rows = [
  {
    image: iconMap,
    name: "Neon Grove Suburb",
    desc: "Explore hidden shops to uncover secret machines and rare crypto garden treasures.",
    onClick: () => {},
  },
  {
    image: iconMap,
    name: "Whispering District",
    desc: "Wander through shadowed alleys where hidden markets offer ancient talismans and cryptic puzzles waiting to be unlocked.",
    onClick: () => {},
  },
  {
    image: iconMap,
    name: "Midnight Sakura Lane",
    desc: "Explore serene streets lined with cherry blossoms, where secretive vendors trade in rare artifacts and mystical garden charms.",
    onClick: () => {},
  },
];

const MapItem = ({ image, name, desc, onClick }: any) => {
  return (
    <ButtonBase className={styled.item} onClick={onClick}>
      <img src={image} alt="icon" width={66} height={66} loading="lazy" />
      <Box>
        <Typography className={styled.title}>{name}</Typography>
        <Typography className={styled.desc}>{desc}</Typography>
      </Box>
      <ArrowForwardIosIcon width={36} />
    </ButtonBase>
  );
};

const ListMaps = () => {
  return (
    <Fade in={true} timeout={500}>
      <Box className={styled.main} p={1}>
        <Stack>
          {rows.map((row: any, pos: number) => (
            <MapItem key={pos} {...row} />
          ))}
        </Stack>
      </Box>
    </Fade>
  );
};
export default ListMaps;
