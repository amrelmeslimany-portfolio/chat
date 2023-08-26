import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/apiConfig";

export const conversationsThunk = createAsyncThunk(
  "conversations/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/conversation");
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const startConversationsThunk = createAsyncThunk(
  "conversations/startConversations",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/conversation/start", {
        recieverID: userID,
      });
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// NOTE Messages
export const getMessagesThunk = createAsyncThunk(
  "conversations/getMessages",
  async ({ converationID }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/conversation/${converationID}`
      );

      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  "conversations/sendMessage",
  async ({ converationID, text, friendId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/${converationID}`, {
        text,
        friendId,
      });
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "conversations/deleteMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/message/delete`, {
        // messageId,
        data: { messageId },
      });
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteConversationThunk = createAsyncThunk(
  "conversations/deleteConversation",
  async (converationID, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/conversation/${converationID}`
      );
      return response.data;
    } catch (error) {
      if (error.message !== "canceled")
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);
