import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

import store from "reduxConfig/store";
import { Provider } from "react-redux";
import { ThirdwebProvider } from "thirdweb/react";
import { ReactTourProvider } from "hooks/reactourProvider";

import App from "App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThirdwebProvider>
          <ReactTourProvider>
            <App />
          </ReactTourProvider>
        </ThirdwebProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
