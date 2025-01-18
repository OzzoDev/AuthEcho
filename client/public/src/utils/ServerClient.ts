import axios, { AxiosResponse } from "axios";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";
import { FetchStatus, ApiResponse, ApiRequest } from "../types/apiTypes";
import { AUTH_KEY, USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";
import { handleError, sessionStore, storeData } from "./utils";

export async function verifyAuthentication(): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    const response = await axios.get<ApiResponse>(AUTH_ENDPOINTS.VERIFYAUTHENTICATION, {
      withCredentials: true,
    });
    return response;
  } catch {
    return null;
  }
}

export async function signUp(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    console.log("Api params: ", apiParams);

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.SIGNUP, apiParams, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Response: ", response);

    const username: string | undefined = apiParams.name;
    const email: string | undefined = apiParams.email;

    if (username && email) {
      storeData(USERNAME_KEY, username);
      storeData(USEREMAIL_KEY, email);
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function verifyAccount(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.VERIFYACCOUNT, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function signIn(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.SIGNIN, apiParams, {
      withCredentials: true,
    });

    const username: string | undefined = response.data.name;
    const email: string | undefined = response.data.email;

    if (username && email) {
      storeData(USERNAME_KEY, username);
      storeData(USEREMAIL_KEY, email);
      sessionStore(AUTH_KEY, true);
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function sendVerificationCode(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.SENDVERIFICATIONCODE, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function updateEmail(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.put<ApiResponse>(AUTH_ENDPOINTS.UPDATEEMAIL, apiParams, {
      withCredentials: true,
    });

    if (apiParams.email) {
      storeData(USEREMAIL_KEY, apiParams.email);
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function updateUsername(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.put<ApiResponse>(AUTH_ENDPOINTS.UPDATEUSERNAME, apiParams, {
      withCredentials: true,
    });

    if (apiParams.name) {
      storeData(USEREMAIL_KEY, apiParams.name);
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function validateEmail(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.VALIDATEEMAIL, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function validatePassword(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.VALIDATEPASSWORD, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function resetPassword(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.RESETPASSWORD, apiParams, {
      withCredentials: true,
    });

    if (response) {
      sessionStore(AUTH_KEY, true);
    }

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function updatePassword(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.put<ApiResponse>(AUTH_ENDPOINTS.UPDATEPASSWORD, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function unlockAccount(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.UNLOCKACCOUNT, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function isSuspended(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.ISSUSPENDED, apiParams, {
      withCredentials: true,
    });

    setStatus("success");
    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function getSecurityQuestions(setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.get<ApiResponse>(AUTH_ENDPOINTS.SECURITYQUESTIONS, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function setSecurityQuestion(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.SETSECURITYQUESTION, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function getUserSecurityQuestion(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.GETUSERSECURITYQUESTION, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}

export async function validateSecurityQuestion(apiParams: ApiRequest, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): Promise<AxiosResponse<ApiResponse> | null> {
  try {
    setStatus("loading");
    setError("");

    const response = await axios.post<ApiResponse>(AUTH_ENDPOINTS.VALIDATESECURITYQUESTION, apiParams, {
      withCredentials: true,
    });

    setStatus("success");

    return response;
  } catch (error: unknown) {
    handleError(error, setStatus, setError);
    return null;
  }
}
