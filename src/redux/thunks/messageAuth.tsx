import customAxios from "utils/customAxios";

import {
  setAuthFailure,
  setAuthStart,
  setAuthSuccess,
  clearMessageAuth,
} from "../slices/messageAuth";

export const fetchChallengeRequest =
  ({ address, from }: any) =>
  async (dispatch: any) => {
    dispatch(setAuthStart());
    const data = {
      address: address,
      chainid: "1",
      uri: from,
    };

    try {
      const response = await customAxios().post("wallet/challengerequest", data);
      dispatch(setAuthSuccess(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setAuthFailure(error?.message));
    }
  };

export const clearMessageAuthUpdate = () => async (dispatch: any) => {
  try {
    dispatch(clearMessageAuth);
  } catch (error: any) {
    dispatch(setAuthFailure(error?.message));
  }
};

export const selectMessageAuth = (state: any) => state.messageAuth.data;
export const selectMessageAuthLoading = (state: any) => state.messageAuth.loading;
export const selectMessageAuthError = (state: any) => state.messageAuth.error;
