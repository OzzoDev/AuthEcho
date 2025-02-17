import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useEffect } from "react";
import { AccountRequest, AccountResponse, FetchStatus, Invoice } from "../types/types";
import {
  reset,
  setError,
  setInvoices,
  setRequestData,
  setResponseData,
  setStatus,
} from "../store/accountSlice";

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

  const updateInvoices = useCallback(
    (invoices: Invoice[]) => {
      dispatch(setInvoices(invoices));
    },
    [dispatch]
  );

  const getInvoice = (invoiceID: string): Invoice | null => {
    return accountState.invoices.find((invocie) => invocie._id === invoiceID) || null;
  };

  const removeInvoice = useCallback(
    (invoiceID: string) => {
      const filteredInvoices = [...accountState.invoices].filter(
        (invocie) => invocie._id !== invoiceID
      );
      dispatch(setInvoices(filteredInvoices));
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
    updateInvoices,
    getInvoice,
    removeInvoice,
    clear,
  };
};

export default useAccountStore;
