import customAxios from "utils/customAxios";
import { sepolia, bsc } from "thirdweb/chains";

import {
  setMessageFailure,
  setMessageStart,
  setMessageSuccess,
  clearMessageAuth,
} from "reduxConfig/slices/messageAuth";

const chainid = process.env.REACT_APP_CHAIN === "bsc" ? bsc.id : sepolia.id;

export const fetchChallengeRequest =
  ({ address, from }: any) =>
  async (dispatch: any) => {
    dispatch(setMessageStart());
    const data = {
      address: address,
      chainid,
      uri: from,
    };

    try {
      const response = await customAxios().post("wallet/challengerequest", data);
      dispatch(setMessageSuccess(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setMessageFailure(error?.message));
    }
  };

export const clearMessageAuthUpdate = () => async (dispatch: any) => {
  try {
    dispatch(clearMessageAuth);
  } catch (error: any) {
    dispatch(setMessageFailure(error?.message));
  }
};

export const selectMessageAuth = (state: any) => state.messageAuth.data;
export const selectMessageAuthLoading = (state: any) => state.messageAuth.loading;
export const selectMessageAuthError = (state: any) => state.messageAuth.error;
