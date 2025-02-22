import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../constants/api-config";
import { ApiMethod, ApiResponse, ApiUseCase } from "../types/types";

const useApi = (method: ApiMethod, useCase: ApiUseCase) => {
  const url: string = API_ENDPOINTS[useCase];

  const callApi = async (requestData?: any): Promise<AxiosResponse<ApiResponse> | null> => {
    try {
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

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMessage = error.response?.data.message || error.message;
        if (error.status === 504) {
          errorMessage = "Service is currently unavailable. Please try again later";
        }
      }
      console.error(error);
      return null;
    }
  };

  return { callApi };
};

export default useApi;
