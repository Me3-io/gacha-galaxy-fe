import { configureStore } from "@reduxjs/toolkit";

import messageAuth from "reduxConfig/slices/messageAuth";
import tokenAuth from "reduxConfig/slices/tokenAuth";

const store = configureStore({
  reducer: {
    messageAuth: messageAuth,
    tokenAuth: tokenAuth,
  },
});

export default store;
