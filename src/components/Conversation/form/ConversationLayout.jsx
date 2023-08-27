import { motion } from "framer-motion";
import ConversationHeader from "./header/ConversationHeader";
import ConversationBody from "./body/ConversationBody";
import ConversationForm from "./send/ConversationForm";
import { memo, useState } from "react";
import { Tag, theme } from "antd";
import classes from "./ConversationLayout.module.css";
import useDocHeight from "../../../hooks/useDocHeight";

const ANIMATION = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    y: 100,
    opacity: 0,
  },
};
const ConversationLayout = ({ chat, is640Screen }) => {
  const { token } = theme.useToken();
  const [formHeigh, setFormHeight] = useState(52);
  const docHeight = useDocHeight();
  const { isBlocked } = chat.friend;
  const onHeight = (height) => {
    if (height && height != formHeigh) setFormHeight(height + 10);
  };

  return (
    <motion.div
      variants={ANIMATION}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backgroundColor: token.colorBgBase, height: docHeight - 50 }}
      className={`${classes.conversationwrapper} ${
        is640Screen ? classes.mobilescreenConversation : ""
      }`}
    >
      <ConversationHeader is640Screen={is640Screen} chat={chat} />
      <ConversationBody formHeight={formHeigh} chat={chat} />
      {isBlocked && (
        <div className="txtcenter">
          <Tag bordered={false}>You blocked this user</Tag>
        </div>
      )}
      {!isBlocked && <ConversationForm getHeight={onHeight} chat={chat} />}
    </motion.div>
  );
};

export default memo(ConversationLayout);
