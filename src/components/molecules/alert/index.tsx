import { Alert as MaterialAlert } from "@mui/material";
import styled from "./styled.module.scss";

const Alert = ({ children, type, onClose }: any) => {
  return (
    <MaterialAlert severity="error" className={styled.alert} onClose={onClose}>
      {children}
    </MaterialAlert>
  );
};
export default Alert;
