import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCOUNT_ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";
import { AccountApiUseCase, AccountResponse, ApiMethod, ApiResponse } from "../types/types";
import useAccountStore from "./useAccountStore";
import { useEffect } from "react";

const useAccountApi = (method: ApiMethod, useCase: AccountApiUseCase, callOnRender?: boolean) => {
  const { requestData, updateStatus, updateError, updateResponseData } = useAccountStore();

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
        ...(method !== "GET" && { data: requestData }),
        withCredentials: true,
      };

      const response = await axios<ApiResponse>(config);

      if (trackState) {
        updateStatus("success");
      }

      updateResponseData(response.data);

      return response;
    } catch (error: unknown) {
      if (trackState) {
        handleError(error, updateStatus, updateError);
      }
      return null;
    }
  };

  useEffect(() => {
    const triggerCallApi = async () => {
      await callApi();
    };
    if (callOnRender) {
      triggerCallApi();
    }
  }, []);

  return { callApi };
};

export default useAccountApi;
