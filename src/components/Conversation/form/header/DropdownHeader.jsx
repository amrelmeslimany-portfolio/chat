import {
  BlockOutlined,
  DeleteOutlined,
  SettingOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal, Spin, Tag, Typography } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteConversationThunk } from "../../../../store/conversations/conversationsThunks";
import { useState } from "react";
import { blockUserThunk } from "../../../../store/users/userThunks";
import { updateBlockedConversation } from "../../../../store/conversations/conversationSlice";
import {
  updateIsBlockUser,
  updateStartChat,
} from "../../../../store/users/usersSlice";
import { socket } from "../../../../constants/socket-client";

const DropdownHeader = ({ friend, id, onOpenDetails }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [modal, modalCNTX] = Modal.useModal();
  const fullname = friend.fullname || friend.fullName;
  let chatName = fullname.split(" ")[0];
  chatName = chatName[0].toUpperCase() + chatName.slice(1);

  const onBlock = () => {
    if (loading) return;
    setLoading(true);
    dispatch(blockUserThunk(friend._id))
      .unwrap()
      .then((item) => {
        toast.success(item.isBlocked ? "Blocked Success" : "Unblocked Success");
        dispatch(updateBlockedConversation(item));
        dispatch(updateIsBlockUser(item));
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  const onDelete = () => {
    if (loading) return;
    setLoading(true);
    dispatch(deleteConversationThunk(id))
      .unwrap()
      .then((_) => {
        toast.success(`${chatName} Deleted`);
        socket.emit("delete chat", {
          chatId: id,
          friend,
          sender: {
            name: user.fullname || user.fullName,
            _id: user._id,
          },
        });
        dispatch(
          updateStartChat({
            id,
            members: [friend._id],
          })
        );
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  const items = [
    {
      key: "View User",
      label: "View User",
      icon: <UserOutlined />,
      onClick: onOpenDetails,
    },
    {
      key: "Block User",
      label: friend.isBlocked ? "Unblock User" : "Block User",
      icon: <StopOutlined />,
      onClick: onBlock,
    },
    {
      key: "Delete Chat",
      label: "Delete Chat",
      icon: <DeleteOutlined />,
      onClick: () =>
        modal.confirm({
          title: `Delete ${chatName}'s Chat`,
          okText: loading ? <Spin /> : "Delete",
          content: (
            <Typography.Text>
              This will remove your chat with <Tag>{chatName}</Tag> and will
              removed her also permanent.
              <br />
              <br />
              <Tag color="warning">NOTE</Tag> You can't return this chat again.
            </Typography.Text>
          ),
          onOk: onDelete,
        }),
    },
  ];

  return (
    <>
      <Dropdown
        destroyPopupOnHide
        trigger={["click"]}
        menu={{
          items,
        }}
      >
        <Button shape="circle" type="text" icon={<SettingOutlined />} />
      </Dropdown>

      {modalCNTX}
    </>
  );
};

export default DropdownHeader;
