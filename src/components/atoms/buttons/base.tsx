import { ButtonBase } from "@mui/material";
import styled from "./styled.module.scss";

const Button = ({ children, onClick }: any) => {
  return (
    <ButtonBase onClick={onClick} className={styled.base}>
      {children}
    </ButtonBase>
  );
};
export default Button;
