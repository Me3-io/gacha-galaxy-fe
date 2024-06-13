import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Web3ModalProvider } from "hooks/wagmiProvider";
import App from "App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ModalProvider>
        <App />
      </Web3ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
