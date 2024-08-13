import { ButtonBase, CircularProgress } from "@mui/material";
import styled from "./styled.module.scss";

const Button = ({ children, onClick, disabled = false, isLoading }: any) => {
  return (
    <ButtonBase onClick={onClick} className={styled.btnBase} disabled={disabled}>
      {isLoading ? (
        <CircularProgress className={styled.spinner} size={16} sx={{ margin: "0 2px" }} />
      ) : (
        children
      )}
    </ButtonBase>
  );
};
export default Button;
