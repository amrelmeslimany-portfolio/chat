import { Avatar, Badge, Button, List, Tag } from "antd";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import StartChat from "./StartChat";
import FriendDetails from "../friend/FriendDetails";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCurrentConversation } from "../../../store/conversations/conversationSlice";
import "./UserItem.css";

const UserItem = ({ user, index }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onOpenDetails = () => setOpen(true);
  const onCloseDetails = () => setOpen(false);

  const onOpenChat = (e) => {
    e.stopPropagation();
    dispatch(
      setCurrentConversation({
        id: user.chats[0]._id,
        friend: user,
        isMessage: true,
      })
    );
  };

  return (
    <>
      <motion.div
        variants={ANIMATION}
        initial="enter"
        animate="animate"
        exit="exit"
        className="useritem"
        onClick={onOpenDetails}
        transition={{ delay: index * 0.1, duration: 0.2 }}
        whileHover={{
          scale: 1.02,
        }}
      >
        <List.Item
          extra={
            user.chats.length === 0 ? (
              <StartChat user={user} />
            ) : (
              <Button
                icon={<SendOutlined />}
                type="text"
                onClick={onOpenChat}
              />
            )
          }
        >
          <List.Item.Meta
            avatar={
              <Badge status="success" offset={[-5, 7]} dot={user.isOnline}>
                <Avatar
                  size={"large"}
                  className="nodark avatar-style"
                  src={user.profileImg}
                />
              </Badge>
            }
            title={user.fullName}
            description={<Tag bordered={false}>{user.username}</Tag>}
          />
        </List.Item>
      </motion.div>

      <FriendDetails isOpen={open} onClose={onCloseDetails} userId={user._id} />
    </>
  );
};

const ANIMATION = {
  enter: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 100,
  },
};

export default memo(UserItem);
