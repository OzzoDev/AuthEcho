import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useEffect } from "react";
import { AccountRequest, AccountResponse, FetchStatus } from "../types/types";
import { reset, setError, setRequestData, setResponseData, setStatus } from "../store/accountSlice";

const useAccountStore = (shouldReset?: boolean) => {
  const dispatch = useDispatch();
  const accountState = useSelector((state: RootState) => state.account);

  useEffect(() => {
    if (shouldReset) {
      dispatch(reset());
    }
  }, [shouldReset, dispatch]);

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

  const updateRequestData = (subObj: AccountRequest) => {
    const updatedRequestData = { ...accountState.requestData, ...subObj };
    dispatch(setRequestData(updatedRequestData));
  };

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
