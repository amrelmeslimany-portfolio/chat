import React from "react";
import UploadProfile from "../../UI/Upload/UploadProfile";
import { DatePicker, Form, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { onDisabledDate } from "../../../utils/functions";
import CountriesSelect from "../../UI/CountriesSelect";
import { useMediaQuery } from "react-responsive";
import { MAX576 } from "../../../constants/breakpoints";

const EditForm = ({ img }) => {
  const is576 = useMediaQuery(MAX576);
  return (
    <>
      <div style={{ textAlign: is576 && "center" }}>
        <UploadProfile isFileUrl={true} file={img} label="Profile" />
      </div>
      <Form.Item
        name="bio"
        label="Bio"
        rules={[{ max: 200, message: "Max letters are 200" }]}
      >
        <Input.TextArea size="large" rows={4} placeholder="Bio" />
      </Form.Item>
      <Form.Item
        name="firstname"
        label="Firstname"
        rules={[
          {
            required: true,
            message: "Please input your Firstname!",
          },
        ]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="Firstname" />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Lastname"
        rules={[
          {
            required: true,
            message: "Please input your Lastname!",
          },
        ]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="Lastname" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please input your Gender!",
          },
        ]}
      >
        <Select
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          placeholder="Gender"
          allowClear={false}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: "Please input your Birthday!",
          },
        ]}
      >
        <DatePicker
          inputReadOnly
          allowClear={false}
          disabledDate={onDisabledDate}
          style={{ width: "100%" }}
          size="large"
          placeholder="Birthday"
        />
      </Form.Item>
      <CountriesSelect label={"Country"} />
    </>
  );
};

export default EditForm;
