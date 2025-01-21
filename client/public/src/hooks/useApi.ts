import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiMethod, ApiResponse, ApiUseCase } from "../types/apiTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";
import useFormStore from "./useFormStore";

const useApi = (method: ApiMethod, useCase: ApiUseCase) => {
  const { formData, setFormError, setFormStatus } = useFormStore();

  const url: string = AUTH_ENDPOINTS[useCase];

  const fetchData = async (useStatus?: boolean): Promise<AxiosResponse<ApiResponse> | null> => {
    // console.log("Sending data... ", formData);

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
        ...(method !== "GET" && { data: formData }),
        withCredentials: true,
      };

      const response = await axios<ApiResponse>(config);

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
