import { createSlice, current } from "@reduxjs/toolkit";
import { usersThunk } from "./userThunks";
import { STATUS } from "../../constants/words";

const initialState = {
  onlines: [],
  mostChatsUsers: [],
  users: {},
  error: null,
  status: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateStartChat: (state, action) => {
      if (state.users.users) {
        const found = state.users.users?.find(({ _id }) =>
          action.payload.members.includes(_id)
        );
        if (found) {
          if (found.chats.length) {
            found.chats.pop();
          } else {
            found.chats.push({ _id: action.payload.id || action.payload._id });
          }
        }
      }
    },
    addSearchedUsers: (state, action) => {
      state.users.users = action.payload;
    },
    updateIsBlockUser: (state, action) => {
      if (state.mostChatsUsers?.length > 0) {
        let found = state.mostChatsUsers.find(
          (user) => user.friend._id == action.payload.userId
        );
        if (found) {
          found.friend.isBlocked = action.payload.isBlocked;
        }
      }
      if (Boolean(Object.keys(state.users).length)) {
        let found = state.users.users.find(
          (user) => user._id == action.payload.userId
        );
        if (found) {
          found.isBlocked = action.payload.isBlocked;
        }
      }
    },
    insertMostChats: (state, action) => {
      state.mostChatsUsers = action.payload;
    },
    insertOnlineUsers: (state, action) => {
      state.onlines = action.payload;
    },
    updateOnlineUsers: (state, action) => {
      if (state.users.users) {
        let newUsers = state.users.users.map((item) => ({
          ...item,
          isOnline: action.payload.includes(item._id),
        }));
        state.users.users = newUsers;
      }
    },
    resetUsers: (state, _) => {
      state.users = initialState.users;
      state.mostChatsUsers = initialState.mostChatsUsers;
      state.onlines = initialState.onlines;
    },
  },
  extraReducers: (builder) => {
    // NOTE Get ALL Chats
    builder
      .addCase(usersThunk.pending, (state, action) => {
        state.status = STATUS.loading;
      })
      .addCase(usersThunk.fulfilled, (state, action) => {
        state.status = STATUS.success;
        state.users = action.payload;
      })
      .addCase(usersThunk.rejected, (state, action) => {
        state.status = STATUS.error;
        state.error = action.payload;
      });
  },
});

export const {
  updateStartChat,
  addSearchedUsers,
  resetUsers,
  insertMostChats,
  updateIsBlockUser,
  insertOnlineUsers,
  updateOnlineUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
