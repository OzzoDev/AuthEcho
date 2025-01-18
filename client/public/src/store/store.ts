import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rememberUserReducer from "./rememberUserSlice";
import tokenReducer from "./tokenSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    rememberUser: rememberUserReducer,
    token: tokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
