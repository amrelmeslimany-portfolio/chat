import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollWrapper from "../../../UI/ScrollWrapper";
import Message from "./Message";
import { Result } from "antd";
import { SendOutlined, StopOutlined } from "@ant-design/icons";
import { getMessagesThunk } from "../../../../store/conversations/conversationsThunks";
import { NormalLoading } from "../../../UI/Loading";
import { scrollToBottom } from "../../../../utils/functions";
import { socket } from "../../../../constants/socket-client";
import "./ConverationBody.css";
import {
  addMessage,
  deleteMessage,
} from "../../../../store/conversations/conversationSlice";
import { AnimatePresence } from "framer-motion";

const ConversationBody = ({ formHeight, chat }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);
  const messages = useSelector((state) => state.conversations.currentMessages);

  useEffect(() => {
    if (chat.isMessage) {
      setLoading(true);
      dispatch(getMessagesThunk({ converationID: chat.id }))
        .unwrap()
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [chat.id, chat.isMessage]);

  useEffect(() => {
    if (bodyRef) {
      setTimeout(() => scrollToBottom(bodyRef.current?.contentWrapperEl), 0);
    }
    return () => clearTimeout();
  }, [messages, isTyping]);

  useEffect(() => {
    socket.on("typing", (data) => {
      if (data.room != chat.id) socket.emit("leave chat", data.room);
      else setIsTyping(data.isType);
    });
    socket.on("receive message", ({ message }) => {
      if (chat.id === message.conversationID) {
        dispatch(
          addMessage({
            ...message,
            isMyMessage: false,
          })
        );
      }
    });
    socket.on("receive delete message", ({ message }) => {
      if (chat.id === message.conversationID) {
        dispatch(deleteMessage(message));
      }
    });

    return () => {
      socket.off("typing");
    };
  }, [chat.id]);

  return (
    <ScrollWrapper
      className="boxchatform"
      ref={bodyRef}
      style={{ height: `calc(100% - (50.64px + ${formHeight}px))` }}
      maxHeight={`calc(100% - (50.64px + ${formHeight}px))`}
    >
      <div className="conversationbody">
        {loading && <NormalLoading />}
        {!loading && error && (
          <Result status="error" subTitle={error.message || error} />
        )}
        {(!chat.isMessage || messages.length === 0) && (
          <Result
            icon={
              chat.friend.isBlocked ? (
                <StopOutlined className="firstmessageIcon" />
              ) : (
                <SendOutlined rotate={-45} className="firstmessageIcon" />
              )
            }
            subTitle={
              chat.friend.isBlocked
                ? "This user is block"
                : "Send Message First"
            }
          />
        )}
        {chat.isMessage &&
          !loading &&
          !error &&
          messages.map((msg) => (
            <Message key={msg._id} message={msg} friend={chat.friend} />
          ))}

        <AnimatePresence mode="wait">
          {isTyping && (
            <Message friend={chat.friend} isTyping={true} message="Typing" />
          )}
        </AnimatePresence>
      </div>
    </ScrollWrapper>
  );
};

export default ConversationBody;
