import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";
import useFormStore from "./useFormStore";
import { AUTH_KEY } from "../constants/contants";
import useSessionStorage from "./useSessionStorage";
import { ApiMethod, ApiRequest, ApiResponse, ApiUseCase, ConnectRequest } from "../types/types";

const useApi = (method: ApiMethod, useCase: ApiUseCase, callback?: () => void) => {
  const { formData, setFormError, setFormStatus } = useFormStore();
  const { setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  const url: string = ENDPOINTS[useCase];

  const fetchData = async (
    useStatus?: boolean,
    apiParams?: ConnectRequest | ApiRequest
  ): Promise<AxiosResponse<ApiResponse> | null> => {
    try {
      if (useStatus) {
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

      if (callback) {
        setSessionValue(true);
        callback();
      }

      if (useStatus) {
        setFormStatus("success");
      }

      return response;
    } catch (error: unknown) {
      if (useStatus) {
        handleError(error, setFormStatus, setFormError);
      }
      return null;
    }
  };

  return { fetchData };
};

export default useApi;
