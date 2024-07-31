import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const tokenAuthSlice = createSlice({
  name: "tokenAuth",
  initialState,
  reducers: {
    setTokenStart(state) {
      state.loading = true;
      state.error = null;
    },
    setTokenSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    setTokenFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthToken(state) {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { setTokenStart, setTokenSuccess, setTokenFailure, clearAuthToken } =
  tokenAuthSlice.actions;

export default tokenAuthSlice.reducer;
