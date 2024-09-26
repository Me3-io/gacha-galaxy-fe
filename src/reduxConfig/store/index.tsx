import { configureStore } from "@reduxjs/toolkit";

import claim from "reduxConfig/slices/claim";
import maps from "reduxConfig/slices/maps";
import game from "reduxConfig/slices/game";
import social from "reduxConfig/slices/social";

import tokenAuth from "reduxConfig/slices/tokenAuth";
import leaderboard from "reduxConfig/slices/leaderboard";
import messageAuth from "reduxConfig/slices/messageAuth";

const store = configureStore({
  reducer: {
    claim: claim,
    maps: maps,
    game: game,
    social: social,
    tokenAuth: tokenAuth,
    leaderboard: leaderboard,
    messageAuth: messageAuth,
  },
});

export default store;
