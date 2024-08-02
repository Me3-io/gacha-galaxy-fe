import customAxios from "utils/customAxios";

import {
  clearClaim,
  setClaimFailure,
  setClaimStart,
  setClaimSuccess,
} from "reduxConfig/slices/claim";

export const fetchClaims = () => async (dispatch: any) => {
  dispatch(setClaimStart());
  try {
    const response = await customAxios().get("user/claimeables");

    const data = response?.data?.data || {};
    dispatch(setClaimSuccess(data));
    return data;
  } catch (error: any) {
    dispatch(setClaimFailure(error?.message));
  }
};

export const clearClaims = () => async (dispatch: any) => {
  try {
    dispatch(clearClaim);
  } catch (error: any) {
    dispatch(setClaimFailure(error?.message));
  }
};

export const getClaims= (state: any) => state.claim.data;
