import { Box, Typography } from "@mui/material";
import Button from "components/atoms/buttons/default";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import machineIcon from "assets/images/maquina-capsule.svg";

import styled from "./styled.module.scss";

const Card = ({ id, name, bet }: any) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (idgame: number) => {
    navigate(`/${i18n.language}/${idgame}`);
  };

  return (
    <Box className={styled.card}>
      <Box className={styled.dotted}></Box>
      <Box className={styled.container}>
        <Box className={styled.machine}>
          <img src={machineIcon} alt={"machine"}  />
        </Box>
        <Typography className={styled.title}>{name}</Typography>
        <Button onClick={() => handleClick(id)}>SELECT</Button>
      </Box>
    </Box>
  );
};

export default Card;
