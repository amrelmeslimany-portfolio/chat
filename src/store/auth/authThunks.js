import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/apiConfig";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ user, signal }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", user, {
        signal,
      });
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ user, signal }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/register",
        data: user,
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct Content-Type for FormData
        },
        signal,
      });
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkLoginThunk = createAsyncThunk(
  "auth/checklogin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/checklogin");
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);
