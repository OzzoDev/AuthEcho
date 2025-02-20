import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AUTH_KEY,
  USERNAME_KEY,
  EMAIL_KEY,
  ADMIN_KEY,
  ACCOUNT_OVERVIEW_KEY,
  HASREVIEWED_KEY,
} from "../constants/contants";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string;
  email: string;
  hasReviewed: boolean;
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(sessionStorage.getItem(AUTH_KEY) || "false"),
  isAdmin: JSON.parse(sessionStorage.getItem(ADMIN_KEY) || "false"),
  username: sessionStorage.getItem(USERNAME_KEY) || "",
  email: sessionStorage.getItem(EMAIL_KEY) || "",
  hasReviewed: JSON.parse(sessionStorage.getItem(HASREVIEWED_KEY) || "false"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(action.payload));
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
      sessionStorage.setItem(ADMIN_KEY, JSON.stringify(action.payload));
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      sessionStorage.setItem(USERNAME_KEY, action.payload);
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      sessionStorage.setItem(EMAIL_KEY, action.payload);
    },
    setHasReviewed: (state, action: PayloadAction<boolean>) => {
      state.hasReviewed = action.payload;
      sessionStorage.setItem(HASREVIEWED_KEY, JSON.stringify(action.payload));
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.username = "";
      state.email = "";
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(USERNAME_KEY);
      sessionStorage.removeItem(EMAIL_KEY);
      sessionStorage.removeItem(ADMIN_KEY);
      sessionStorage.removeItem(ACCOUNT_OVERVIEW_KEY);
    },
  },
});

export const {
  setIsAuthenticated,
  setIsAdmin,
  setUsername,
  setEmail,
  setHasReviewed,
  clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;
