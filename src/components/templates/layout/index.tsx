import { Box } from "@mui/material";
import styles from "./styled.module.scss";
import ActionsBar from "components/organisms/actionsbar";
import AlertPopup from "components/molecules/alert/alertPopup";

const Layout = ({ children, showHelp = false }: any) => {
  return (
    <Box className={styles.appLayout}>
      <AlertPopup />
      <ActionsBar showHelp={showHelp} />
      {children}
    </Box>
  );
};

export default Layout;
