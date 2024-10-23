import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./i18n";

import store from "reduxConfig/store";
import { Provider } from "react-redux";
import { ThirdwebProvider } from "thirdweb/react";
import { AlertProvider } from "hooks/alertProvider/alertContext";

import { UserOptions, cookie3Analytics } from "@cookie3/analytics";
import { Cookie3Provider } from "hooks/cookie3Provider";

import App from "App";
import "./index.css";
import SDKInitializer from "utils/sdkInitiliazer";

const config: UserOptions = {
  siteId: 1609, //then we need to replace with the real data
};

const analytics = cookie3Analytics(config);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Cookie3Provider value={analytics}>
        <Provider store={store}>
          <ThirdwebProvider>
            <AlertProvider>
              <SDKInitializer />
              <App />
            </AlertProvider>
          </ThirdwebProvider>
        </Provider>
      </Cookie3Provider>
    </BrowserRouter>
  </React.StrictMode>
);
