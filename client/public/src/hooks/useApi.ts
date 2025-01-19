import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiMethod, ApiRequest, ApiResponse, ApiUseCase, FetchStatus } from "../types/apiTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";

const useApi = (method: ApiMethod, useCase: ApiUseCase) => {
  const url: string = AUTH_ENDPOINTS[useCase];

  const fetchData = async (
    setStatus: (status: FetchStatus) => void,
    setError: (error: string) => void,
    apiParams?: ApiRequest
  ): Promise<AxiosResponse<ApiResponse> | null> => {
    try {
      setStatus("loading");

      setError("");

      const config: AxiosRequestConfig = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && { data: apiParams }),
        withCredentials: true,
      };

      const response = await axios<ApiResponse>(config);

      setStatus("success");

      return response;
    } catch (error: unknown) {
      handleError(error, setStatus, setError);
      return null;
    }
  };

  return { fetchData };
};

export default useApi;
