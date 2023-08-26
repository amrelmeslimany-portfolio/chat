import { useRef, useState } from "react";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { sendMessageThunk } from "../../../../store/conversations/conversationsThunks";
import { filterMessage, handleTypingTime } from "../../../../utils/functions";
import { addMessage } from "../../../../store/conversations/conversationSlice";
import EmojiPicker from "./EmojiPicker";
import { socket } from "../../../../constants/socket-client";
import "./ConversationForm.css";

const ConversationForm = ({ getHeight, chat }) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [value, setValue] = useState("");
  const formRef = useRef(null);
  const sentEmitTyping = { room: chat.id, reciverId: chat.friend._id };
  const onSelectEmoji = (emoji) => setValue((prev) => `${prev}${emoji}`);

  const onFormChange = (e) => {
    setValue(e.target.value);
    getHeight(formRef.current.resizableTextArea.textArea.offsetHeight);
    socket.emit("typing", {
      ...sentEmitTyping,
      isType: true,
    });
    handleTypingTime(() =>
      socket.emit("typing", {
        ...sentEmitTyping,
        isType: false,
      })
    );
  };

  const onSendMessage = () => {
    if (value.trim().length === 0) return;
    setloading(true);
    dispatch(
      sendMessageThunk({
        converationID: chat.id,
        text: filterMessage(value),
        friendId: chat.friend._id,
      })
    )
      .unwrap()
      .then((item) => {
        dispatch(addMessage(item));
        setValue("");
        getHeight(52);
        socket.emit("new message", {
          message: item,
          reciverId: chat.friend._id,
        });
      })
      .catch((error) => toast.error(error))
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <div className="conversatrionfrom">
      <EmojiPicker onSelectEmoji={onSelectEmoji} />
      <Input.TextArea
        ref={formRef}
        onChange={onFormChange}
        onKeyUp={(_) =>
          getHeight(formRef.current.resizableTextArea.textArea.offsetHeight)
        }
        bordered={false}
        className="sendmessage"
        autoSize={{ maxRows: 6 }}
        placeholder="Type a message..."
        size="large"
        value={value}
        disabled={loading}
      />
      <Button
        size="large"
        icon={<SendOutlined />}
        className="btn-send"
        type="primary"
        onClick={onSendMessage}
        loading={loading}
      />
    </div>
  );
};

export default ConversationForm;
