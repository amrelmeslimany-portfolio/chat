import { Divider, Space, Tag } from "antd";

const DividerCounter = ({ text, counter }) => {
  return (
    <Divider>
      <Space size={"small"}>
        <small>{text}</small>
        <Tag color="green" bordered={false}>
          {counter}
        </Tag>
      </Space>
    </Divider>
  );
};

export default DividerCounter;
