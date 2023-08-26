import { InfoCircleOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Tooltip, theme } from "antd";
import React from "react";

const ChangePassForm = ({ loading }) => {
  return (
    <>
      <Form.Item
        label="Old Password"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          disabled={loading}
          size="large"
          prefix={<LockOutlined />}
          placeholder="Old Password"
        />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            min: 8,
            message: "Password must me more than 8 letters",
          },
        ]}
      >
        <Input.Password
          disabled={loading}
          size="large"
          prefix={<LockOutlined />}
          placeholder="New Password"
          suffix={
            <Tooltip title="Must be more than 8 letters">
              <InfoCircleOutlined />
            </Tooltip>
          }
        />
      </Form.Item>
      <Form.Item
        label="Confirm New"
        name="reNewPassword"
        rules={[
          {
            required: true,
            message: "Please input your Confirm Password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          disabled={loading}
          size="large"
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
          suffix={
            <Tooltip title="Must be more than 8 letters">
              <InfoCircleOutlined />
            </Tooltip>
          }
        />
      </Form.Item>
    </>
  );
};

export default ChangePassForm;
