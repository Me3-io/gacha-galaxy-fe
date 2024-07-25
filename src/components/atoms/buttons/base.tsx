import { ButtonBase } from "@mui/material";
import styled from "./styled.module.scss";

const Button = ({ children, onClick, disabled = false }: any) => {
  return (
    <ButtonBase onClick={onClick} className={styled.btnBase} disabled={disabled} >
      {children}
    </ButtonBase>
  );
};
export default Button;
