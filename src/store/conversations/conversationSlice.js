import { createSlice } from "@reduxjs/toolkit";
import {
  conversationsThunk,
  deleteConversationThunk,
  deleteMessageThunk,
  getMessagesThunk,
} from "./conversationsThunks";
import { STATUS } from "../../constants/words";

const initialState = {
  currentChat: null,
  currentMessages: [],
  list: {},
  error: null,
  status: "idle",
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    insertConversation: (state, action) => {
      if (state.list.conversations) {
        state.list.conversations.push({
          friend: action.payload.user,
          id: action.payload.item._id,
          isMessage: false,
          isFirstTime: true,
        });
      }
    },
    setCurrentConversation: (state, action) => {
      state.currentChat = action.payload;
    },
    onCloseCurrentConversation: (state) => {
      state.currentChat = initialState.currentChat;
      state.currentMessages = initialState.currentMessages;
    },
    setIsTyping: (state, action) => {
      if (state.currentChat) {
        state.currentChat.isTyping = action.payload;
      }
    },
    updateDelete: (state, action) => {
      state.currentChat = initialState.currentChat;
      state.currentMessages = initialState.currentMessages;
      if (state.list.conversations) {
        state.list.conversations = state.list.conversations.filter(
          (chat) => (chat._id || chat.id) !== action.payload
        );
        state.list.total = state.list.total - 1;
      }
    },
    updateBlockedConversation: (state, action) => {
      let found = state.list.conversations.find(
        (item) => item.friend._id === action.payload.userId
      );
      if (found) {
        found.friend.isBlocked = action.payload.isBlocked;
      }
      if (state.currentChat) {
        if (Object.keys(state.currentChat).includes("friend")) {
          state.currentChat.friend.isBlocked = action.payload.isBlocked;
        } else {
          state.currentChat.isBlocked = action.payload.isBlocked;
        }
      }
    },
    addMessage: (state, action) => {
      const messagesSize = state.currentMessages.length;

      if (messagesSize > 0) {
        state.currentMessages[messagesSize - 1].isNextSame =
          state.currentMessages[messagesSize - 1].sender ===
          action.payload.sender;
      }

      if (state.currentChat && !state.currentChat.isMessage)
        state.currentChat.isMessage = true;

      state.currentMessages.push({ ...action.payload, isNextSame: false });

      // Update last message in list
      if (state.list.conversations) {
        const found = state.list.conversations.find(
          (item) => (item._id || item.id) === action.payload.conversationID
        );

        if (found) found.lastMessage = action.payload;
      }
    },
    deleteMessage: (state, action) => {
      if (state.currentMessages.length) {
        const currentIndex = state.currentMessages.findIndex(
          ({ _id }) => action.payload._id === _id
        );
        if (
          !state.currentMessages[currentIndex].isNextSame &&
          state.currentMessages.length > 1
        ) {
          const previousItem = state.currentMessages[currentIndex - 1];
          if (previousItem) previousItem.isNextSame = false;
        }
        state.currentMessages = state.currentMessages.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    updateLastMessageConv: (state, action) => {
      if (state.list.conversations) {
        const found = state.list.conversations.find(
          (item) => (item._id || item.id) === action.payload.conversationID
        );
        if (found) {
          found.lastMessage = action.payload;
        }
      }
    },
    updateNotRead: (state, action) => {
      if (state.list.conversations) {
        const found = state.list.conversations.find(
          (item) => (item._id || item.id) === action.payload.conversationID
        );
        if (found) {
          if (action.payload.notRead === "reset") delete found.notRead;
          else found.notRead = found.notRead ? found.notRead + 1 : 1;
        }
      }
    },
    resetConversation: (state, _) => {
      state.currentChat = initialState.currentChat;
      state.currentMessages = initialState.currentMessages;
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    // NOTE Get ALL Chats
    builder
      .addCase(conversationsThunk.pending, (state, action) => {
        state.status = STATUS.loading;
      })
      .addCase(conversationsThunk.fulfilled, (state, action) => {
        state.status = STATUS.success;
        state.list = action.payload;
      })
      .addCase(conversationsThunk.rejected, (state, action) => {
        state.status = STATUS.error;
        state.error = action.payload;
      })
      // NOTE Delete Conversation
      .addCase(deleteConversationThunk.fulfilled, (state, action) => {
        state.currentChat = initialState.currentChat;
        state.currentMessages = initialState.currentMessages;
        state.list.conversations = state.list.conversations.filter(
          (chat) => (chat._id || chat.id) !== action.payload
        );
        state.list.total = state.list.total - 1;
      })
      // NOTE Messages
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        let handeled =
          action.payload.length > 1
            ? action.payload.map((item, index) => {
                const nextMessage = action.payload[index + 1];
                return {
                  ...item,
                  isNextSame:
                    nextMessage && nextMessage.sender === item.sender
                      ? true
                      : false,
                };
              })
            : action.payload;
        state.currentMessages = handeled;
      })
      // NOTE Remove Message
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        const currentIndex = state.currentMessages.findIndex(
          ({ _id }) => action.payload.messageId === _id
        );
        if (
          !state.currentMessages[currentIndex].isNextSame &&
          state.currentMessages.length > 1
        ) {
          const previousItem = state.currentMessages[currentIndex - 1];
          if (previousItem) previousItem.isNextSame = false;
        }
        state.currentMessages = state.currentMessages.filter(
          ({ _id }) => action.payload.messageId !== _id
        );
      });
  },
});

export const {
  setCurrentConversation,
  addMessage,
  resetConversation,
  setIsTyping,
  updateBlockedConversation,
  onCloseCurrentConversation,
  insertConversation,
  updateDelete,
  updateLastMessageConv,
  deleteMessage,
  updateNotRead,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
