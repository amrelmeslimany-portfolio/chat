import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import AuthHeader from "./authHeader";
import { routes } from "../../constants/routes";
import CustomLink from "../UI/CustomLink";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/auth/authThunks";
import { useSignal } from "../../hooks/useSignal";
import { clearAuth } from "../../store/auth/authSlice";
import { STATUS } from "../../constants/words";
import StatusHandler from "../UI/StatusHandler";
import { useEffect, useRef } from "react";
import { scrollToElement } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HelmetWrap from "../UI/HelmetWrap";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signal } = useSignal(clearAuth);
  const { status, error, user } = useSelector((state) => state.auth);
  const parentRef = useRef();

  const onLogin = (values) => {
    dispatch(loginThunk({ user: values, signal }));
    scrollToElement(parentRef.current);
  };

  useEffect(() => {
    if (status == STATUS.success && user) {
      navigate("/", { replace: true });
      toast.success("Login Success");
    }
  }, [status, user]);

  return (
    <div ref={parentRef}>
      <HelmetWrap title="Login" />
      <AuthHeader
        title="Welcome to Chat"
        paragraph="Login and enjoy with communication"
      />
      <StatusHandler error={error} status={status} />
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onLogin}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            disabled={status == STATUS.loading}
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            disabled={status == STATUS.loading}
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button
          className="fullwidth"
          size="large"
          type="primary"
          htmlType="submit"
          loading={status === STATUS.loading}
        >
          Log in
        </Button>
      </Form>
      <Divider>or</Divider>
      <CustomLink isFull to={routes.register}>
        Create Account
      </CustomLink>
    </div>
  );
}

export default LoginForm;
