import { Box, Typography } from "@mui/material";
import Button from "components/atoms/buttons/default";

import machineIcon from "assets/images/maquina-capsule.svg";
import styled from "./styled.module.scss";

const Card = ({ id, name, setOpenGames }: any) => {

  return (
    <Box className={styled.card}>
      <Box className={styled.dotted}></Box>
      <Box className={styled.container}>
        <Box className={styled.machine}>
          <img src={machineIcon} alt={"machine"}  />
        </Box>
        <Typography className={styled.title}>{name}</Typography>
        <Button onClick={() => setOpenGames(true)}>SELECT</Button>
      </Box>
    </Box>
  );
};

export default Card;
