import { type Cookie3Analytics } from "@cookie3/analytics";
import { createContext, useContext } from "react";

export interface ProviderProps {
  children?: React.ReactNode;
  value: Cookie3Analytics;
}

const Cookie3Context = createContext<Cookie3Analytics | undefined>(undefined);

export const Cookie3Provider = ({ children, value }: ProviderProps) => {
  return <Cookie3Context.Provider value={value}>{children}</Cookie3Context.Provider>;
};

export const useCookie3 = () => {
  const context = useContext(Cookie3Context);

  return context;
};
