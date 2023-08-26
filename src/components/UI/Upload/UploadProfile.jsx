import React, { useState } from "react";
import { Avatar, Form, Upload } from "antd";
import { PictureFilled } from "@ant-design/icons";
import "./UploadProfile.css";

const beforeUpload = (_) => {
  return false;
};

const UploadProfile = ({ file, label, isFileUrl, isCenter }) => {
  const [imageUrl, setImageUrl] = useState(
    file && (isFileUrl ? file : URL.createObjectURL(file.file))
  );
  const handleChange = (info) => setImageUrl(URL.createObjectURL(info.file));

  return (
    <Form.Item
      label={label}
      name="image"
      className={`uploadprofile ${isCenter ? "center" : ""}`}
    >
      <Upload
        style={{ overflow: "hidden", width: 100 }}
        maxCount={1}
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        fileList={null}
      >
        {imageUrl ? (
          <img className="temp-image nodark" src={imageUrl} alt="avatar" />
        ) : (
          <Avatar
            icon={<PictureFilled className="uploadimg-icon" />}
            size="large"
          />
        )}
      </Upload>
    </Form.Item>
  );
};

export default UploadProfile;
