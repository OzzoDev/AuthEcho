import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiRequest, FetchStatus, FormState } from "../types/types";

interface FormSliceState {
  status: FetchStatus;
  error: string;
  formData: ApiRequest;
  formState: FormState;
}

const initialState: FormSliceState = {
  status: "idle",
  error: "",
  formData: {},
  formState: "default",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<FetchStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setData(state, action: PayloadAction<ApiRequest>) {
      state.formData = action.payload;
    },
    setState(state, action: PayloadAction<FormState>) {
      state.error = "";
      state.formState = action.payload;
    },
    resetForm(state) {
      state.status = "idle";
      state.error = "";
      state.formData = {};
      state.formState = "default";
    },
  },
});

export const { setStatus, setError, setData, setState, resetForm } = formSlice.actions;

export default formSlice.reducer;
