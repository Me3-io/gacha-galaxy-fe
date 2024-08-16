import { Grow, Alert as MaterialAlert } from "@mui/material";
import styled from "./styled.module.scss";
import { useEffect } from "react";

const Alert = ({ children, type, onClose, severity = "error" }: any) => {
  const style = `${styled.alert} ${styled[severity]}`;

  useEffect(() => {
    if (children) setTimeout(() => onClose(), 10000);
  }, [children, onClose]);

  return (
    <Grow in={true}>
      <MaterialAlert severity={severity} className={style} onClose={onClose}>
        {children}
      </MaterialAlert>
    </Grow>
  );
};
export default Alert;
