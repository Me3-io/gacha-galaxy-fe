import customAxios from "utils/customAxios";
import { setTokenFailure, setTokenStart, setTokenSuccess } from "reduxConfig/slices/tokenAuth";

export const fetchChallengeVerify =
  ({ signature, message }: any) =>
  async (dispatch: any) => {
    dispatch(setTokenStart());
    const data = {
      message: message,
      signature: signature,
    };

    try {
      const response = await customAxios().post("wallet/challengeverify", data);
      dispatch(setTokenSuccess({ token: response.data }));
      return response.data;
    } catch (error: any) {
      dispatch(setTokenFailure(error?.message));
    }
  };

export const selectAuthToken = (state: any) => state.authToken.data;
export const selectAuthTokenLoading = (state: any) => state.authToken.loading;
export const selectAuthTokenError = (state: any) => state.authToken.error;