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
    setMessageStart(state) {
      state.loading = true;
      state.error = null;
    },
    setMessageSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
    },
    setMessageFailure(state, { payload }) {
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

export const { setMessageStart, setMessageSuccess, setMessageFailure, clearMessageAuth } =
  messageAuthSlice.actions;

export default messageAuthSlice.reducer;
