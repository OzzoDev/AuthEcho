import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthechoApp } from "../types/types";
import { USER_APPS_KEY } from "../constants/contants";

interface ManageAppState {
  apps: AuthechoApp[];
}

const initialState: ManageAppState = {
  apps: (() => {
    try {
      const storedApps = sessionStorage.getItem(USER_APPS_KEY);
      return storedApps ? JSON.parse(storedApps) : [];
    } catch (error) {
      return [];
    }
  })(),
};

const formSlice = createSlice({
  name: "manageApp",
  initialState,
  reducers: {
    setApps(state, action: PayloadAction<AuthechoApp[]>) {
      const apps = action.payload;
      if (apps) {
        state.apps = apps;
        sessionStorage.setItem(USER_APPS_KEY, JSON.stringify(apps));
      }
    },
  },
});

export const { setApps } = formSlice.actions;

export default formSlice.reducer;
