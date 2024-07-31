import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboardStart(state) {
      state.loading = true;
      state.error = null;
    },
    setLeaderboardSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
    },
    setLeaderboardFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    clearLeaderboard(state) {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const {
  setLeaderboardStart,
  setLeaderboardSuccess,
  setLeaderboardFailure,
  clearLeaderboard,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
