import { Box, Typography } from "@mui/material";
import Button from "components/atoms/buttons/animated";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styled from "./styled.module.scss";

const Card = ({ id, name, bet }: any) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (idgame: number) => {
    navigate(`/${i18n.language}/${idgame}`);
  };

  return (
    <Box className={styled.cardWrap}>
      <Box className={styled.card}>
        <Box className={styled.dotted}></Box>
        <Box className={styled.container}>
          <Typography className={styled.title}>{name}</Typography>
          <Box className={styled.tokens}>
            <span className={styled.minbet}>Minimum bet</span>
            <span className={styled.points}>{bet | 0}</span>
            <span className={styled.info}>Tokens</span>
          </Box>
          <Button onClick={() => handleClick(id)}>PLAY</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
