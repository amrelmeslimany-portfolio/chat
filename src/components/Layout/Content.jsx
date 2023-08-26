import { Layout, Result } from "antd";
import PageListContent from "./PageListContent";
import ConversationLayout from "../Conversation/form/ConversationLayout";
import { AnimatePresence } from "framer-motion";
import { AuthRoutesAnimation } from "../UI/Animation";
import { useSelector } from "react-redux";
import { MAX640 } from "../../constants/breakpoints";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { socket } from "../../constants/socket-client";

const Content = () => {
  const { currentChat } = useSelector((state) => state.conversations);
  const is640 = useMediaQuery(MAX640);

  useEffect(() => {
    if (currentChat) socket.emit("join chat", currentChat.id);
  }, [currentChat]);

  return (
    <Layout.Content style={{ display: "inline-flex", overflowX: "hidden" }}>
      <PageListContent is640={is640} />
      {/* NOTE Pass user and conversation id */}
      <AnimatePresence mode="wait">
        {currentChat ? (
          <ConversationLayout is640Screen={is640} chat={currentChat} />
        ) : (
          !is640 && NoConversation
        )}
      </AnimatePresence>
    </Layout.Content>
  );
};

const NoConversation = (
  <AuthRoutesAnimation style={{ marginTop: "5%", flex: 1 }}>
    <Result
      title="Empty Chats"
      status="404"
      subTitle="You mast chat user firstly then add chat and click on chat to open"
    />
  </AuthRoutesAnimation>
);

export default Content;
