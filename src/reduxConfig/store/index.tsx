import { configureStore } from "@reduxjs/toolkit";

import buildings from "reduxConfig/slices/buildings";
import leaderboard from "reduxConfig/slices/leaderboard";
import messageAuth from "reduxConfig/slices/messageAuth";
import tokenAuth from "reduxConfig/slices/tokenAuth";

const store = configureStore({
  reducer: {
    buildings: buildings,
    leaderboard: leaderboard,
    messageAuth: messageAuth,
    tokenAuth: tokenAuth,
  },
});

export default store;
