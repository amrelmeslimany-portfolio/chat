import { Avatar, Badge, List, Space, Tag, Typography, theme } from "antd";
import { motion } from "framer-motion";
import classes from "./ConversationItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentConversation,
  updateNotRead,
} from "../../store/conversations/conversationSlice";
import { format, isToday } from "date-fns";
import { DATE_FORMAT } from "../../constants/words";
import { detectTags } from "../../utils/functions";
import { useCallback } from "react";

const ConversationItem = ({ item }) => {
  const dispatch = useDispatch();
  const { currentChat } = useSelector((state) => state.conversations);
  const { token } = theme.useToken();
  const isMessage = Boolean(item.lastMessage?.text);

  const onConversation = useCallback(() => {
    if (currentChat && item._id === currentChat?.id) return;
    if (item.notRead)
      dispatch(updateNotRead({ conversationID: item._id, notRead: "reset" }));

    dispatch(
      setCurrentConversation({
        id: item._id || item.id,
        friend: item.friend,
        isMessage,
      })
    );
  }, [item, currentChat]);

  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.05,
      }}
    >
      <List.Item
        className={`${classes.parentconvitem}`}
        style={{
          backgroundColor: item._id === currentChat?.id && token.colorBgLayout,
        }}
        onClick={onConversation}
      >
        <List.Item.Meta
          avatar={
            <Badge
              offset={[-5, 7]}
              dot={item.friend.isOnline || item.isOnline}
              status="success"
            >
              <Avatar
                className={`${classes.avatar} nodark`}
                size="large"
                src={item.friend.profileImg}
              />
            </Badge>
          }
          title={item.friend.fullname || item.friend.fullName}
          description={
            isMessage ? (
              <Typography.Text className={classes.graytext} ellipsis>
                {item.lastMessage.isMyMessage && (
                  <b className={classes.youcolor}>you: </b>
                )}
                {detectTags(item.lastMessage.text)}
              </Typography.Text>
            ) : (
              <Tag bordered={false} color="orange">
                New
              </Tag>
            )
          }
        />

        <Space>
          <Tag
            bordered={false}
            className={classes.time}
            color={!isMessage && "blue"}
          >
            {isMessage
              ? isToday(new Date(item.lastMessage.createdAt))
                ? format(new Date(item.lastMessage.createdAt), "hh:mm a")
                : format(new Date(item.lastMessage.createdAt), DATE_FORMAT)
              : "Click"}
          </Tag>
          {item.notRead && <Tag color="red">{item.notRead}</Tag>}
        </Space>
      </List.Item>
    </motion.div>
  );
};

export default ConversationItem;
