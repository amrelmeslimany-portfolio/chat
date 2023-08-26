import { BellOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Space, theme } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSider } from "../../../store/global/globalSlice";

const TopNavbar = ({ width }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const { isSiderOpen } = useSelector((state) => state.global);
  return (
    <Space
      style={{
        width: width,
        padding: "10px 15px",
        justifyContent: "space-between",
        backgroundColor: token.colorBgContainer,
        borderBottom: "1px solid #adb2bf10",
      }}
    >
      <Button
        onClick={() => dispatch(toggleSider())}
        type="text"
        icon={isSiderOpen ? <CloseOutlined /> : <MenuOutlined />}
      />
      <Button type="text" icon={<BellOutlined />} />
    </Space>
  );
};

export default TopNavbar;
