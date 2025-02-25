import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiRequest, FetchStatus, FormState } from "../types/types";

interface FormSliceState {
  status: FetchStatus;
  error: string;
  formData: ApiRequest;
  formState: FormState;
  currentStep: number;
}

const initialState: FormSliceState = {
  status: "idle",
  error: "",
  formData: { rememberUser: true },
  formState: "default",
  currentStep: 1,
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
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    resetForm(state) {
      state.status = "idle";
      state.error = "";
      state.formData = { rememberUser: true };
      state.formState = "default";
      state.currentStep = 1;
    },
  },
});

export const { setStatus, setError, setData, setState, setCurrentStep, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
