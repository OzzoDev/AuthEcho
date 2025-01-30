import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useAuthechoApiStore from "./useAuthechoApiStore";
import { AUTHECHO_ENDPOINTS } from "../../constants/authecho-config";
import { ApiMethod, AuthechoApiUseCase, AuthechoResponse } from "../../types/types";

const useAuthechoApi = (
  method: ApiMethod,
  useCase: AuthechoApiUseCase,
  shouldNavigate?: boolean
) => {
  const { requestData, updateError, updateStatus } = useAuthechoApiStore();

  const url: string = AUTHECHO_ENDPOINTS[useCase];

  const callApi = async (trackState?: boolean): Promise<AxiosResponse<AuthechoResponse> | null> => {
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

      const response = await axios<AuthechoResponse>(config);

      if (trackState && !shouldNavigate) {
        updateStatus("success");
      }

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && trackState) {
        let errorMessage = error.response?.data.message || error.message;
        if (error.status === 504) {
          errorMessage = "Service is currently unavailable. Please try again later";
        }
        updateError(errorMessage);
      }
      updateStatus("error");
      console.error(error);
      return null;
    }
  };

  return { callApi };
};

export default useAuthechoApi;
