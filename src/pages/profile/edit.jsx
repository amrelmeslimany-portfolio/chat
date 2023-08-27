import { Button, Divider, Form, theme } from "antd";
import ScrollWrapper from "../../components/UI/ScrollWrapper";
import EditForm from "../../components/Profile/edit/EditForm";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import PreviewEdit from "../../components/Profile/edit/PreviewEdit";
import { useRef, useState } from "react";
import { editUserThunk } from "../../store/users/userThunks";
import { toast } from "react-toastify";
import { updateUser } from "../../store/auth/authSlice";
import EditPassword from "../../components/Profile/edit/passwords/EditPassword";
import HelmetWrap from "../../components/UI/HelmetWrap";
import { useMediaQuery } from "react-responsive";
import { MAX640, MAX992 } from "../../constants/breakpoints";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useDocHeight from "../../hooks/useDocHeight";

const LAYOUT = {
  labelCol: { sm: { span: 4 } },
  wrapperCol: {
    sm: {
      offset: 3,
      span: 17,
    },
  },
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const docHeight = useDocHeight();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { token } = theme.useToken();
  const is992 = useMediaQuery(MAX992);
  const is640 = useMediaQuery(MAX640);
  const parentRef = useRef();

  const initialValues = {
    ...user,
    country: user.counrty,
    birthday: dayjs(new Date(user.birthday)),
  };

  const onFinish = (values) => {
    const formdata = new FormData();

    for (const key in values) {
      const value = values[key];
      if (!value) continue;
      if (key == "image" && value) {
        formdata.append(key, value.file);
        continue;
      }
      if (key == "birthday") {
        formdata.append(key, value.$d);
        continue;
      }
      formdata.append(key, value);
    }
    setLoading(true);
    dispatch(editUserThunk(formdata))
      .unwrap()
      .then((newUser) => {
        dispatch(updateUser(newUser));
        toast.success("User Update Successfull");
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <HelmetWrap title={`${user.fullname || user.fullName}'s Edit Profile`} />
      <ScrollWrapper
        ref={parentRef}
        maxHeight={is992 && docHeight - 52}
        style={{
          minHeight: is992 ? docHeight - 52 : "100vh",
        }}
      >
        <div style={{ display: "flex" }}>
          <Form
            onFinish={onFinish}
            initialValues={initialValues}
            {...LAYOUT}
            style={{
              flex: 1,
              padding: "1% 20px 4%",
              background: token.colorBgContainer,
            }}
          >
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              onClick={() => navigate(-1)}
            />
            <Divider />
            <EditForm img={user.profileImg} />
            <EditPassword />
            <Form.Item wrapperCol={{ sm: { offset: 7 } }}>
              <Button
                block
                loading={loading}
                size="large"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
          {!is640 && <PreviewEdit user={user} />}
        </div>
      </ScrollWrapper>
    </>
  );
};

export default EditProfile;
