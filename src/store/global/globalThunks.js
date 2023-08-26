import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/apiConfig";

export const searchThunk = createAsyncThunk(
  "global/search",
  async (q, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/search?q=${q}`);
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);
