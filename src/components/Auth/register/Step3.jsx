import { InfoCircleOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Tooltip } from "antd";
import { AuthRoutesAnimation } from "../../UI/Animation";

function Step3() {
  return (
    <AuthRoutesAnimation>
      <Form.Item
        name="password"
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
        name="repassword"
        rules={[
          {
            required: true,
            message: "Please input your Confirm Password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
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
    </AuthRoutesAnimation>
  );
}

export default Step3;
