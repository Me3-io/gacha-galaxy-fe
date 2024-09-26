// AuthContext.js
import { createContext, useState } from "react";

const ALERT_TIME = 10000;
const initialState = {
  text: "",
  type: "",
};

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: string) => {},
});

export const AlertProvider = ({ children }: any) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const setAlert = (text: string, type: string) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
