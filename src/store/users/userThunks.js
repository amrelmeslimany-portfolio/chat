import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/apiConfig";

export const editUserThunk = createAsyncThunk(
  "users/editUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/user/edit", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editPasswordThunk = createAsyncThunk(
  "users/editPassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/user/password/change",
        passwords
      );
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const usersThunk = createAsyncThunk(
  "users/getAll",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user?usersType=${type}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userDetailsThunk = createAsyncThunk(
  "users/getDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const mostChatsThunk = createAsyncThunk(
  "users/mostchats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/chats/most`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBlockedThunk = createAsyncThunk(
  "users/getBlocked",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/block`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const blockUserThunk = createAsyncThunk(
  "users/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/user/block/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
