import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: boolean = false;

const rememberUserSlice = createSlice({
  name: "rememberUser",
  initialState,
  reducers: {
    setRememberUser(_, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const selectRememberUser = (state: { rememberUser: boolean }) => state.rememberUser;

export const { setRememberUser } = rememberUserSlice.actions;

export default rememberUserSlice.reducer;
