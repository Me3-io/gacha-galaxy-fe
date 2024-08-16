import { Box } from "@mui/material";
import styles from "./styled.module.scss";
import ActionsBar from "components/organisms/actionsbar";

const Layout = ({ children, hideHelp = false }: any) => {
  return (
    <Box className={styles.appLayout}>
      <ActionsBar hideHelp={hideHelp} />
      {children}
    </Box>
  );
};

export default Layout;
