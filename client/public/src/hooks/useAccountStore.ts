import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import { AccountRequest, AccountResponse, FetchStatus } from "../types/types";
import { reset, setError, setRequestData, setResponseData, setStatus } from "../store/accountSlice";

const useAccountStore = () => {
  const dispatch = useDispatch();

  const accountState = useSelector((state: RootState) => state.account);

  const updateStatus = useCallback(
    (status: FetchStatus) => {
      dispatch(setStatus(status));
    },
    [dispatch]
  );

  const updateError = useCallback(
    (error: string) => {
      dispatch(setError(error));
    },
    [dispatch]
  );

  const updateRequestData = useCallback(
    (name: keyof AccountRequest, value: string) => {
      const updatedRequestData = { ...accountState.requestData, [name]: value };
      dispatch(setRequestData(updatedRequestData));
    },
    [dispatch]
  );

  const updateResponseData = useCallback(
    (responseData: AccountResponse) => {
      dispatch(setResponseData(responseData));
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    ...accountState,
    updateStatus,
    updateError,
    updateRequestData,
    updateResponseData,
    clear,
  };
};

export default useAccountStore;
