import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Slice {
  token: string | null;
}

const initialState: Slice = {
  token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setSessionToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeSessionToken(state) {
      state.token = null;
    },
  },
});

export const { setSessionToken, removeSessionToken } = tokenSlice.actions;

export default tokenSlice.reducer;
