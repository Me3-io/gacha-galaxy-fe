import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, { payload }) {
      state.data = payload;
    },
    clearGame(state) {
      state.data = initialState.data;
    },
  },
});

export const { setGame, clearGame } = gameSlice.actions;

export default gameSlice.reducer;
