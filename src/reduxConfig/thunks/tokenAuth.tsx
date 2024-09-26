import customAxios from "utils/customAxios";
import { setTokenFailure, setTokenStart, setTokenSuccess } from "reduxConfig/slices/tokenAuth";

export const fetchChallengeVerify =
  ({ signature, message, social }: any) =>
  async (dispatch: any) => {
    dispatch(setTokenStart());
    const data = {
      message: message,
      signature: signature,
      social
    };

    try {
      const response = await customAxios().post("wallet/challengeverify", data);
      dispatch(setTokenSuccess({ token: response.data }));
      return response.data;
    } catch (error: any) {
      dispatch(setTokenFailure(error?.message));
    }
  };

export const selectAuthToken = (state: any) => state.tokenAuth.data;
export const selectAuthTokenLoading = (state: any) => state.tokenAuth.loading;
export const selectAuthTokenError = (state: any) => state.tokenAuth.error;
