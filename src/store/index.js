import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice";
import conversationSlice from "./conversations/conversationSlice";
import authSlice from "./auth/authSlice";
import usersSlice from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    conversations: conversationSlice,
    auth: authSlice,
    users: usersSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
