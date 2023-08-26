import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import ChangePassForm from "./ChangePassForm";
import { useSignal } from "../../../../hooks/useSignal";
import { useDispatch } from "react-redux";
import { editPasswordThunk } from "../../../../store/users/userThunks";
import { toast } from "react-toastify";

const EditPassword = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onChange = (values) => {
    if (loading) return;
    setLoading(true);
    dispatch(editPasswordThunk(values))
      .unwrap()
      .then((msg) => {
        toast.success(msg);
        setOpen(false);
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Form.Item label="Change Password">
        <Button className="bgcolor" block onClick={() => setOpen(true)}>
          Change Password
        </Button>
      </Form.Item>
      <Modal
        confirmLoading={loading}
        onCancel={() => {
          if (loading) return;
          setOpen(false);
        }}
        maskClosable={false}
        okText="Change"
        destroyOnClose
        open={open}
        title="Change Password"
        okButtonProps={{ htmlType: "submit" }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={onChange}
          labelCol={{ span: 7 }}
          style={{ paddingTop: 10 }}
        >
          <ChangePassForm loading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditPassword;
