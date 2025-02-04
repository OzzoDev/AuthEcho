import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountRequest, AccountResponse, AccountTabName, FetchStatus } from "../types/types";

interface AccountState {
  status: FetchStatus;
  error: string;
  requestData: AccountRequest;
  responseData: AccountResponse;
  currentTab: AccountTabName;
}

const initialState: AccountState = {
  status: "idle",
  error: "",
  requestData: {},
  responseData: { message: "", success: false },
  currentTab: "Overview",
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
    setCurrentTab(state, action: PayloadAction<AccountTabName>) {
      state.currentTab = action.payload;
    },
    reset(state) {
      state.status = "idle";
      state.error = "";
      state.requestData = {};
      state.responseData = { message: "", success: false };
      state.currentTab = "Overview";
    },
  },
});

export const { setStatus, setError, setRequestData, setResponseData, setCurrentTab, reset } =
  formSlice.actions;

export default formSlice.reducer;
