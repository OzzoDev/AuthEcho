import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCOUNT_ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";
import { AccountResponse, ApiMethod, ApiResponse } from "../types/types";
import useAccountStore from "./useAccountStore";
import useAuthStore from "./useAuthStore";

const useAccountApi = (method: ApiMethod, useCase: keyof typeof ACCOUNT_ENDPOINTS) => {
  const { username } = useAuthStore();
  const { requestData, updateStatus, updateError } = useAccountStore();

  const url = ACCOUNT_ENDPOINTS[useCase];

  const callApi = async (trackState?: boolean): Promise<AxiosResponse<AccountResponse> | null> => {
    try {
      if (trackState) {
        updateStatus("loading");
        updateError("");
      }

      const config: AxiosRequestConfig = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && { data: { ...requestData, user: username } }),
        withCredentials: true,
      };

      const response = await axios<ApiResponse>(config);

      if (trackState) {
        updateStatus("success");
      }

      return response;
    } catch (error: unknown) {
      if (trackState) {
        handleError(error, updateStatus, updateError);
      }
      return null;
    }
  };

  return { callApi };
};

export default useAccountApi;
