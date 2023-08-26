import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startConversationsThunk } from "../../../store/conversations/conversationsThunks";
import { updateStartChat } from "../../../store/users/usersSlice";
import { setCurrentConversation } from "../../../store/conversations/conversationSlice";
import { toast } from "react-toastify";
import { socket } from "../../../constants/socket-client";

function StartChat({ user }) {
  const dispatch = useDispatch();
  const { fullname, profileImg, _id } = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const onStartChat = (e) => {
    e.stopPropagation();
    setLoading(true);
    dispatch(startConversationsThunk(user._id))
      .unwrap()
      .then((item) => {
        // Update the users
        socket.emit("add chat", {
          item,
          reciverId: user._id,
          user: {
            fullname,
            profileImg,
            _id,
            isOnline: true,
            isBlocked: false,
          },
        });
        dispatch(updateStartChat({ id: item._id, members: item.members }));
        dispatch(
          setCurrentConversation({
            id: item._id,
            friend: user,
            isMessage: false,
          })
        );
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };
  return (
    <Button loading={loading} type="primary" size="small" onClick={onStartChat}>
      chat
    </Button>
  );
}

export default StartChat;
