import { configureStore } from "@reduxjs/toolkit";

import claim from "reduxConfig/slices/claim";
import buildings from "reduxConfig/slices/buildings";
import tokenAuth from "reduxConfig/slices/tokenAuth";
import leaderboard from "reduxConfig/slices/leaderboard";
import messageAuth from "reduxConfig/slices/messageAuth";

const store = configureStore({
  reducer: {
    claim: claim,
    buildings: buildings,
    tokenAuth: tokenAuth,
    leaderboard: leaderboard,
    messageAuth: messageAuth,
  },
});

export default store;
