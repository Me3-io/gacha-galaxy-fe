import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import Layout from "components/templates/layout";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";



const Game = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { idgame } = useParams();

  const handleClick = () => {
    navigate(`/${i18n.language}/`);
  };

  return (
    <Layout>
      <Container maxWidth={"xl"} disableGutters={true}>
        <Box
          onClick={handleClick}
          sx={{ cursor: "pointer", display: "flex", color: "#ffffff", padding: "20px" }}
        >
          <ArrowBackIos />
          <span>home</span>
        </Box>
        <Typography color={"#fff"} textAlign={"center"} p={5} fontSize={"2rem"}>
          {idgame}
        </Typography>
      </Container>
    </Layout>
  );
};
export default Game;
