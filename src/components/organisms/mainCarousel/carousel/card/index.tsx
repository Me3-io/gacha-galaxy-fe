import { Box, Typography } from "@mui/material";
import Button from "components/atoms/buttons/default";

import capsuleIcon from "assets/games/capsule/capsule-machine-angle-view.png";
import clawMachineIcon from "assets/games/clawMachine/Angled_View.png";

import styled from "./styled.module.scss";
//import { useTranslation } from "react-i18next";

const Card = ({ item, type, setDetails }: any) => {

  //const { t } = useTranslation();

  const getMachineIcon = (code: string) => {
    switch (code) {
      case "claw-machine":
        return clawMachineIcon;
      default:
        return capsuleIcon;
    }
  };

  return (
    <Box className={styled.card}>
      <Box className={styled.dotted}></Box>
      <Box className={styled.container}>

        {type === "game" ? (
          <Box className={styled.machine}>
            <img
              src={getMachineIcon(item.code)}
              alt={"machine"}
              style={{ transform: "translateX(-10px)" }}
            />
          </Box>
        ) : (
          <Box className={styled.campaing}>
            <img src={item.image[0].url} alt={"campaing"} className={styled.image} />
          </Box>
        )}

        <Typography className={styled.title}>{item.name}</Typography>
        <Button onClick={() => setDetails(item)}>
          {type === "game" ? "START GAME" : "START QUEST"}
        </Button>
      </Box>
    </Box>
  );
};

export default Card;
