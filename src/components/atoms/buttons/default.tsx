import { ButtonBase } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const Button = ({ children, onClick, isLoading, disabled = false }: any) => {
  return (
    <ButtonBase onClick={onClick} className={styled.btnDefault} disabled={disabled}>
      {isLoading ? (
        <CircularProgress className={styled.spinner} size={20} />
      ) : (
        <span>{children}</span>
      )}
    </ButtonBase>
  );
};
export default Button;
