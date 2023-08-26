import { Empty, List, Result } from "antd";
import ConversationItem from "../components/Conversation/ConversationItem";
import DividerCounter from "../components/UI/DividerCounter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationsThunk } from "../store/conversations/conversationsThunks";
import { STATUS } from "../constants/words";
import { numberWithZero } from "../utils/functions";
import { NormalLoading } from "../components/UI/Loading";
import { EmptyList } from "../constants/images";
import HelmetWrap from "../components/UI/HelmetWrap";
import { socket } from "../constants/socket-client";
import {
  updateLastMessageConv,
  updateNotRead,
} from "../store/conversations/conversationSlice";

function Conversation() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.conversations);
  const { onlines } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(conversationsThunk());
    socket.on("receive message", (data) => {
      dispatch(
        updateNotRead({
          conversationID: data.message.conversationID,
          notRead: 1,
        })
      );
      dispatch(updateLastMessageConv({ ...data.message, isMyMessage: false }));
    });
  }, []);

  return (
    <>
      <HelmetWrap title="Your Conversations" />
      <DividerCounter
        text="Chats"
        counter={
          status === STATUS.success ? numberWithZero(list.total) : "error"
        }
      />
      {status === STATUS.loading && <NormalLoading />}

      {status === STATUS.error && <Result status="error" subTitle={error} />}

      {status === STATUS.success && (
        <List
          bordered={false}
          locale={{
            emptyText: (
              <Empty
                description="No Conversations"
                image={<img src={EmptyList} />}
              />
            ),
          }}
          itemLayout="horizontal"
          dataSource={list.conversations}
          renderItem={(item) => (
            <ConversationItem
              key={item.id || item._id}
              item={{
                ...item,
                friend: {
                  ...item.friend,
                  isOnline: onlines.includes(item.friend._id),
                },
              }}
            />
          )}
        />
      )}
    </>
  );
}

export default Conversation;
