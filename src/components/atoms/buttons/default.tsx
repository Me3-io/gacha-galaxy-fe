import { ButtonBase } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const Button = ({ children, onClick, isLoading }: any) => {
  return (
    <ButtonBase onClick={onClick} className={styled.btnDefault}>
      {isLoading ? (
        <CircularProgress className={styled.spinner} size={20} />
      ) : (
        <span>{children}</span>
      )}
    </ButtonBase>
  );
};
export default Button;
