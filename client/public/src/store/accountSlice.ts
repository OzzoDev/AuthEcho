import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountRequest, AccountResponse, FetchStatus, Invoice } from "../types/types";
import { ACCOUNT_OVERVIEW_KEY, USER_INVOICES_KEY } from "../constants/contants";

interface AccountState {
  status: FetchStatus;
  error: string;
  requestData: AccountRequest;
  responseData: AccountResponse;
  invoices: Invoice[];
  unReadInvoices: number;
  accountOverview: AccountResponse;
}

const initialState: AccountState = {
  status: "idle",
  error: "",
  requestData: {},
  responseData: { message: "", success: false },
  invoices: JSON.parse(sessionStorage.getItem(USER_INVOICES_KEY) || "[]"),
  unReadInvoices: 0,
  accountOverview: JSON.parse(sessionStorage.getItem(ACCOUNT_OVERVIEW_KEY) || "{}"),
};

const formSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<FetchStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setRequestData(state, action: PayloadAction<AccountRequest>) {
      state.requestData = action.payload;
    },
    setResponseData(state, action: PayloadAction<AccountResponse>) {
      state.responseData = action.payload;
    },
    setInvoices(state, action: PayloadAction<Invoice[]>) {
      if (action.payload) {
        state.invoices = action.payload;
        sessionStorage.setItem(USER_INVOICES_KEY, JSON.stringify(action.payload));
      }
    },
    setUnReadInvocies(state, action: PayloadAction<number>) {
      state.unReadInvoices = action.payload;
    },
    setAccountOverview(state, action: PayloadAction<AccountResponse>) {
      if (action.payload) {
        state.accountOverview = action.payload;
        sessionStorage.setItem(ACCOUNT_OVERVIEW_KEY, JSON.stringify(action.payload));
      }
    },
    reset(state) {
      state.status = "idle";
      state.error = "";
      state.requestData = {};
      state.responseData = { message: "", success: false };
    },
  },
});

export const {
  setStatus,
  setError,
  setRequestData,
  setResponseData,
  setInvoices,
  setUnReadInvocies,
  setAccountOverview,
  reset,
} = formSlice.actions;

export default formSlice.reducer;
