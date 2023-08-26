import { createSlice } from "@reduxjs/toolkit";
import {
  checkLoginThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./authThunks";
import { STATUS } from "../../constants/words";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      // NOTE Login
      .addCase(loginThunk.pending, (state, action) => {
        state.status = STATUS.loading;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = STATUS.success;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = STATUS.error;
        state.error = action.payload;
      })
      // NOTE Register
      .addCase(registerThunk.pending, (state, action) => {
        state.status = STATUS.loading;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = STATUS.success;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = STATUS.error;
        state.error = action.payload;
      })
      // NOTE Check Login
      .addCase(checkLoginThunk.fulfilled, (state, action) => {
        state.user = action.payload || null;
      })
      // NOTE Logout
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const { clearAuth, updateUser } = authSlice.actions;

export default authSlice.reducer;
