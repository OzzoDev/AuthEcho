import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ADMIN_ENDPOINTS } from "../constants/ApiEndpoints";
import { handleError } from "../utils/utils";
import { AccountResponse, AdminRequest, ApiMethod, ApiResponse } from "../types/types";
import useAuthStore from "./useAuthStore";
import useAdminStore from "./useAdminStore";

const useAdminApi = (method: ApiMethod, useCase: keyof typeof ADMIN_ENDPOINTS) => {
  const { username } = useAuthStore();
  const { updateStatus, updateError } = useAdminStore();

  const url = ADMIN_ENDPOINTS[useCase];

  const callApi = async (
    trackState?: boolean,
    data?: AdminRequest
  ): Promise<AxiosResponse<AccountResponse> | null> => {
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
        ...(method !== "GET" && { data: { ...data, user: username } }),
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

export default useAdminApi;
