import { setSocial as setSlice, clearSocial as clearSlice } from "reduxConfig/slices/social";

export const setSocial = () => async (dispatch: any) => {
  dispatch(setSlice);
};
export const clearSocial = () => async (dispatch: any) => {
  dispatch(clearSlice);
};

export const getSocial = (state: any) => state.social.data;
