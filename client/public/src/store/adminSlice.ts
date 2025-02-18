import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminResponse, FetchStatus } from "../types/types";
import { ADMIN_OVERVIEW_KEY } from "../constants/contants";

interface AccountState {
  status: FetchStatus;
  error: string;
  unResolvedIssues: number;
  overview: AdminResponse;
}

const initialState: AccountState = {
  status: "idle",
  error: "",
  unResolvedIssues: 0,
  overview: JSON.parse(sessionStorage.getItem(ADMIN_OVERVIEW_KEY) || "{}"),
};

const formSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<FetchStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setUnResolvedIssues(state, action: PayloadAction<number>) {
      state.unResolvedIssues = action.payload;
    },
    setOverview(state, action: PayloadAction<AdminResponse>) {
      if (action.payload) {
        state.overview = action.payload;
        sessionStorage.setItem(ADMIN_OVERVIEW_KEY, JSON.stringify(action.payload));
      }
    },
    reset(state) {
      state.status = "idle";
      state.error = "";
    },
  },
});

export const { setStatus, setError, setUnResolvedIssues, setOverview, reset } = formSlice.actions;

export default formSlice.reducer;
