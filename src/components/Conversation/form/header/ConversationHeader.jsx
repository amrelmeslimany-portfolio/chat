import { Badge, Button, Image, Space, Typography } from "antd";
import classes from "./ConversationHeader.module.css";
import DropdownHeader from "./DropdownHeader";
import { useState } from "react";
import FriendDetails from "../../../Users/friend/FriendDetails";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { onCloseCurrentConversation } from "../../../../store/conversations/conversationSlice";

const ConversationHeader = ({ chat, is640Screen }) => {
  const { friend } = chat;
  const dispatch = useDispatch();
  const { onlines } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const onOpenDetails = () => setOpen(true);
  const isOnline = onlines.includes(friend._id);
  const onBackChat = () => {
    dispatch(onCloseCurrentConversation());
  };

  return (
    <>
      <Space className={classes.conversationheader}>
        <div className={classes.information}>
          {is640Screen && (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={onBackChat}
              type="text"
            />
          )}
          <Badge dot={isOnline} offset={[-5, 34]} color="green">
            <Image
              src={friend.profileImg}
              className={`${classes.avatar} ${classes.cursorpointer} nodark`}
              preview={{
                destroyOnClose: true,
                mask: false,
                footer: false,
              }}
            />
          </Badge>
          <article onClick={onOpenDetails} className={classes.cursorpointer}>
            <Typography.Title className={classes.header} level={5}>
              {friend.fullname || friend.fullName}
            </Typography.Title>
            {isOnline && (
              <Typography.Text className={classes.text}>Online</Typography.Text>
            )}
          </article>
        </div>
        <DropdownHeader
          friend={friend}
          id={chat.id || chat._id}
          onOpenDetails={onOpenDetails}
        />
      </Space>
      <FriendDetails
        userId={friend._id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ConversationHeader;
