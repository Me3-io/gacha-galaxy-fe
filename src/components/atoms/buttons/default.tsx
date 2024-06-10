import { ButtonBase } from "@mui/material";
import styled from "./styled.module.scss";

const Button = ({ children, onClick }: any) => {
  return (
    <ButtonBase onClick={onClick} className={styled.default}>
      <span>{children}</span>
    </ButtonBase>
  );
};
export default Button;
