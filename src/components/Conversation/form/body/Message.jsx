import { motion } from "framer-motion";
import { Avatar, Button, Modal, Tag, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteMessageThunk } from "../../../../store/conversations/conversationsThunks";
import { toast } from "react-toastify";
import { TypingSVG } from "../../../../constants/images";
import { socket } from "../../../../constants/socket-client";
import { useMediaQuery } from "react-responsive";
import "./Message.css";
import {
  handleDate,
  hasArabicCharacters,
  truncateText,
} from "../../../../utils/functions";
import { MAX576 } from "../../../../constants/breakpoints";

const Message = ({ message, friend, isTyping }) => {
  const dispatch = useDispatch();
  const { profileImg, fullname } = useSelector((state) => state.auth.user);
  const { isMyMessage, text, isNextSame } = message;
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [modal, modalCNTX] = Modal.useModal();
  const is576 = useMediaQuery(MAX576);

  const classNameMessage = `message ${isMyMessage ? " mymessage" : ""} ${
    isNextSame ? "samePersonMessage" : ""
  }`;

  const onDragMessage = (_) => {
    if (!isMyMessage) return;
    modal.confirm({
      title: `Delete Message`,
      okText: loading ? <Spin /> : "Delete",
      content: (
        <Typography.Text>
          This will remove message in all sides (You and Friend)
        </Typography.Text>
      ),
      onOk: onDelete,
    });
  };

  const onDelete = () => {
    if (loading) return;
    setLoading(true);
    dispatch(deleteMessageThunk(message._id))
      .unwrap()
      .then((_) => {
        socket.emit("delete message", { message, reciverId: friend._id });
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  const drags = {
    drag: "x",
    dragTransition: { bounceStiffness: 600, bounceDamping: 20 },
    dragConstraints: { right: 10, left: 0 },
    dragElastic: { right: 0, left: 0.08 },
    dragSnapToOrigin: true,
  };

  return (
    <motion.div
      {...(isMyMessage && drags)}
      initial="init"
      whileInView="enter"
      viewport={{ once: true }}
      className={classNameMessage}
      onDragEnd={onDragMessage}
    >
      {modalCNTX}
      {!isNextSame && !is576 && (
        <Avatar
          className={`avatar nodark`}
          src={isMyMessage ? profileImg : friend.profileImg}
        />
      )}

      <div className="messagecontainer">
        {isTyping && <img src={TypingSVG} />}
        {!isTyping && (
          <>
            {!isNextSame && (
              <Typography.Title level={3} className="name">
                {isMyMessage && (
                  <>
                    {fullname.split(" ")[0]}
                    <Tag color="yellow" className="youword">
                      you
                    </Tag>
                  </>
                )}
                {!isMyMessage && (friend.fullname || friend.fullName)}
              </Typography.Title>
            )}
            <Typography>
              <p
                dangerouslySetInnerHTML={{
                  __html: isMore ? text : truncateText(text).body,
                }}
                dir={hasArabicCharacters(text.split(" ")[0]) ? "rtl" : "ltr"}
                className="messagetext"
              />
              {truncateText(text).isMore && (
                <Button
                  size="small"
                  type="text"
                  onClick={() => setIsMore((prev) => !prev)}
                >
                  {isMore ? "See Less" : "See More"}
                </Button>
              )}
            </Typography>
            <div className="right">
              <Tag
                className="time"
                icon={<ClockCircleOutlined />}
                bordered={false}
              >
                {handleDate(message.updatedAt)}
              </Tag>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Message;
