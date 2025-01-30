import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADMIN_KEY, AUTH_KEY, EMAIL_KEY, USERNAME_KEY } from "../constants/constants";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(sessionStorage.getItem(AUTH_KEY) || "false"),
  isAdmin: JSON.parse(sessionStorage.getItem(ADMIN_KEY) || "false"),
  username: sessionStorage.getItem(USERNAME_KEY) || "",
  email: sessionStorage.getItem(EMAIL_KEY) || "",
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
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.username = "";
      state.email = "";
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(ADMIN_KEY);
      sessionStorage.removeItem(USERNAME_KEY);
      sessionStorage.removeItem(EMAIL_KEY);
    },
  },
});

export const { setIsAuthenticated, setIsAdmin, setUsername, setEmail, clearAuthState } =
  authSlice.actions;

export default authSlice.reducer;
