import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
