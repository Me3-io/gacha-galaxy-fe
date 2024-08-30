import { Alert } from "@mui/material";
import useAlert from "hooks/alertProvider/useAlert";
import styled from "./styled.module.scss";

const AlertPopup = () => {
  const { text, type } = useAlert();
  const style = `${styled.alert} ${styled[type]}`;

  if (text && type) {
    return (
      <Alert severity={type as any} className={style}>
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
