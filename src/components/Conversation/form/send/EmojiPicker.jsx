import { Button, Popover } from "antd";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { SmileOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./EmojiPicker.css";

const EmojiPicker = ({ onSelectEmoji }) => {
  const { darkMode } = useSelector((state) => state.global);
  return (
    <Popover
      overlayClassName="popover-emoji"
      trigger="click"
      content={
        <Picker
          noCountryFlags={true}
          theme={darkMode ? "dark" : "light"}
          data={data}
          skinTonePosition="none"
          style={{ height: 200 }}
          onEmojiSelect={(emoji) => onSelectEmoji(emoji.native)}
          previewPosition="none"
          emojiSize={16}
        />
      }
    >
      <Button
        shape="circle"
        size="large"
        className="emoji-btn"
        icon={<SmileOutlined />}
      />
    </Popover>
  );
};

export default EmojiPicker;
