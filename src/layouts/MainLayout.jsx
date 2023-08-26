import { Layout } from "antd";
import Sider from "../components/Layout/sider/Sider";
import Content from "../components/Layout/Content";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../constants/socket-client";
import {
  insertConversation,
  updateDelete,
} from "../store/conversations/conversationSlice";
import { updateStartChat } from "../store/users/usersSlice";
import { toast } from "react-toastify";

const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("new chat", (data) => {
      dispatch(insertConversation(data));
      dispatch(updateStartChat(data.item));
    });
    socket.on("deleted chat", (data) => {
      toast.warning(`${data.sender.name} Delete Chat`);
      dispatch(updateDelete(data.chatId));
      dispatch(
        updateStartChat({
          id: data.chatId,
          members: [data.sender._id],
        })
      );
    });
    return () => {
      socket.off("new chat");
      socket.off("deleted chat");
    };
  }, []);
  return (
    <Layout hasSider>
      <Sider />
      <Content />
    </Layout>
  );
};

export default MainLayout;
