import { configureStore } from "@reduxjs/toolkit";

import buildings from "reduxConfig/slices/buildings";
import messageAuth from "reduxConfig/slices/messageAuth";
import tokenAuth from "reduxConfig/slices/tokenAuth";

const store = configureStore({
  reducer: {
    messageAuth: messageAuth,
    tokenAuth: tokenAuth,
    buildings: buildings,
  },
});

export default store;
