import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";
import useFormStore from "./useFormStore";
import {
  ApiMethod,
  ApiRequest,
  ApiResponse,
  AppActivityRequest,
  ConnectRequest,
} from "../types/types";

const useApi = (method: ApiMethod, useCase: keyof typeof ENDPOINTS, shouldNavigate?: boolean) => {
  const { formData, setFormError, setFormStatus } = useFormStore();

  const url: string = ENDPOINTS[useCase];

  const fetchData = async (
    trackState?: boolean,
    apiParams?: ConnectRequest | ApiRequest | AppActivityRequest
  ): Promise<AxiosResponse<ApiResponse> | null> => {
    try {
      if (trackState) {
        setFormStatus("loading");
        setFormError("");
      }

      const config: AxiosRequestConfig = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && { data: apiParams ? apiParams : formData }),
        withCredentials: true,
      };

      const response = await axios<ApiResponse>(config);

      if (trackState && !shouldNavigate) {
        setFormStatus("success");
      }

      return response;
    } catch (error: unknown) {
      if (trackState) {
        handleError(error, setFormStatus, setFormError);
      }
      return null;
    }
  };

  return { fetchData };
};

export default useApi;
