import { Grow, Alert as MaterialAlert } from "@mui/material";
import styled from "./styled.module.scss";

const Alert = ({ children, type, onClose }: any) => {
  return (
    <Grow in={true}>
      <MaterialAlert severity="error" className={styled.alert} onClose={onClose}>
        {children}
      </MaterialAlert>
    </Grow>
  );
};
export default Alert;
