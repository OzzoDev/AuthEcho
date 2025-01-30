import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthehcoRequest, SignInState, Status } from "../types/types";

interface AuthechoApiSliceState {
  status: Status;
  error: string;
  requestData: AuthehcoRequest;
  signInState: SignInState;
  question: string;
}

const initialState: AuthechoApiSliceState = {
  status: "idle",
  error: "",
  requestData: { user: "", rememberUser: true },
  signInState: "user",
  question: "",
};

const apiSlice = createSlice({
  name: "authecho",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setRequestData(state, action: PayloadAction<AuthehcoRequest>) {
      state.requestData = action.payload;
    },
    setSignInState(state, action: PayloadAction<SignInState>) {
      state.signInState = action.payload;
    },
    setQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },
    reset(state) {
      state.status = "idle";
      state.error = "";
      state.requestData = { user: "", rememberUser: true };
      state.signInState = "user";
      state.question = "";
    },
  },
});

export const { setStatus, setError, setRequestData, setSignInState, setQuestion, reset } =
  apiSlice.actions;

export default apiSlice.reducer;
