import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const messageAuthSlice = createSlice({
  name: "messageAuth",
  initialState,
  reducers: {
    setAuthStart(state) {
      state.loading = true;
      state.error = null;
    },
    setAuthSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
    },
    setAuthFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    clearMessageAuth(state) {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { setAuthStart, setAuthSuccess, setAuthFailure, clearMessageAuth } =
  messageAuthSlice.actions;

export default messageAuthSlice.reducer;
