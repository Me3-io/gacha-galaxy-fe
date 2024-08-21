import { Box } from "@mui/material";
import styles from "./styled.module.scss";
import ActionsBar from "components/organisms/actionsbar";

const Layout = ({ children, showHelp = false }: any) => {
  return (
    <Box className={styles.appLayout}>
      <ActionsBar showHelp={showHelp} />
      {children}
    </Box>
  );
};

export default Layout;
