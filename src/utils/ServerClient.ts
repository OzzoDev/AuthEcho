import axios, { AxiosResponse } from "axios";
import { ApiResponse, EmailValidation, FetchStatus, PasswordValidation, ResetPassword, SignIn, UpdateEmail, UpdatePassword, UpdateUsername, User, VerifyAccountCredz } from "../types/userTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";
import { JwtTokenResponse, DefaultResponse, UserDataResponse, UserData, VerificationCodeRequest, UnlockAccountRequest } from "../types/apiTypes";
import { getToken, handleError, removeToken, storeData, storeToken } from "./utils";
import { USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";
import { setAuth, signin, signup } from "../store/authSlice";
import { AppDispatch } from "../store/store";

export async function signUp(userData: User, setStatus: (status: FetchStatus) => void, setError: (error: string) => void, dispatch: AppDispatch): Promise<AxiosResponse<JwtTokenResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<JwtTokenResponse>(AUTH_ENDPOINTS.SIGNUP, userData);
    const token: string = response.data.jwtToken;
    if (token) {
      storeToken(token);
      storeData(USERNAME_KEY, userData.name);
      storeData(USEREMAIL_KEY, userData.email);
      dispatch(signup());
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function verifyAccount(credentials: VerifyAccountCredz, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<VerifyAccountCredz> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<VerifyAccountCredz>(AUTH_ENDPOINTS.VERIFYACCOUNT, credentials);

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function signIn(userData: SignIn, setStatus: (status: FetchStatus) => void, setError: (error: string) => void, dispatch: AppDispatch): Promise<AxiosResponse<JwtTokenResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<JwtTokenResponse>(AUTH_ENDPOINTS.SIGNIN, userData);
    await getUserData(userData.userData, setStatus, setError);

    const token: string = response.data.jwtToken;

    if (token) {
      storeToken(token);
      dispatch(signin());
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    removeToken();
    return null;
  }
}

export async function sendVerificationCode(params: VerificationCodeRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<VerificationCodeRequest> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<VerificationCodeRequest>(AUTH_ENDPOINTS.SENDVERIFICATIONCODE, params);

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function updateEmail(updateData: UpdateEmail, setStatus: (status: FetchStatus) => void, setError: (error: string) => void, dispatch: AppDispatch): Promise<AxiosResponse<JwtTokenResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.put<JwtTokenResponse>(AUTH_ENDPOINTS.UPDATEEMAIL, updateData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    const token: string = response.data.jwtToken;
    if (token) {
      storeToken(token);
      storeData(USEREMAIL_KEY, updateData.email);
      dispatch(setAuth(true));
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function updateUsername(updateData: UpdateUsername, setStatus: (status: FetchStatus) => void, setError: (error: string) => void, dispatch: AppDispatch): Promise<AxiosResponse<JwtTokenResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.put<JwtTokenResponse>(AUTH_ENDPOINTS.UPDATEUSERNAME, updateData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    const token: string = response.data.jwtToken;
    if (token) {
      storeToken(token);
      storeData(USEREMAIL_KEY, updateData.name);
      dispatch(setAuth(true));
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function validateEmail(data: EmailValidation, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<PasswordValidation, AxiosResponse<ApiResponse>>(AUTH_ENDPOINTS.VALIDATEEMAIL, data);

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function validatePassword(credentials: PasswordValidation, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<PasswordValidation, AxiosResponse<ApiResponse>>(AUTH_ENDPOINTS.VALIDATEPASSWORD, credentials);

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function resetPassword(userData: ResetPassword, setStatus: (status: FetchStatus) => void, setError: (error: string) => void, dispatch: AppDispatch): Promise<AxiosResponse<JwtTokenResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<JwtTokenResponse>(AUTH_ENDPOINTS.RESETPASSWORD, userData);
    await getUserData(userData.userData, setStatus, setError);

    const token: string = response.data.jwtToken;

    if (token) {
      storeToken(token);
      dispatch(setAuth(true));
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function updatePassword(updateData: UpdatePassword, setStatus: (status: FetchStatus) => void, setError: (error: string) => void, dispatch: AppDispatch): Promise<AxiosResponse<JwtTokenResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.put<JwtTokenResponse>(AUTH_ENDPOINTS.UPDATEPASSWORD, updateData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    const token: string = response.data.jwtToken;

    if (token) {
      storeToken(token);
      dispatch(setAuth(true));
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function unlockAccount(unlockData: UnlockAccountRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.UNLOCKACCOUNT, unlockData);

    setStatus("success");
    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function isSuspended(userData: string, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.ISSUSPENDED, { userData });

    setStatus("success");
    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function getUserData(userData: string, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<UserData | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<UserDataResponse>(AUTH_ENDPOINTS.USERNAME, { userData });

    const userDataResponse = response.data.userData;

    storeData(USERNAME_KEY, userDataResponse.name);
    storeData(USEREMAIL_KEY, userDataResponse.email);

    setStatus("success");

    return userDataResponse;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function verify(): Promise<AxiosResponse<DefaultResponse>> {
  try {
    return await axios.get<DefaultResponse>(AUTH_ENDPOINTS.VERIFY, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error: unknown) {
    throw error;
  }
}
