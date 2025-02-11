import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthechoApp } from "../types/types";

interface ManageAppState {
  apps: AuthechoApp[];
}

const initialState: ManageAppState = {
  apps: [],
};

const formSlice = createSlice({
  name: "manageApp",
  initialState,
  reducers: {
    setApps(state, action: PayloadAction<AuthechoApp[]>) {
      state.apps = action.payload;
    },
  },
});

export const { setApps } = formSlice.actions;

export default formSlice.reducer;
