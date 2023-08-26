import { UserOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import UploadProfile from "../../UI/Upload/UploadProfile";
import { AuthRoutesAnimation } from "../../UI/Animation";

function Step1({ file }) {
  return (
    <AuthRoutesAnimation>
      <UploadProfile file={file} isCenter={true} />
      <Row wrap gutter={[5, 5]}>
        <Col sm={{ span: 12 }} span={24}>
          <Form.Item
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your Firstname!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Firstname"
            />
          </Form.Item>
        </Col>
        <Col sm={{ span: 12 }} span={24}>
          <Form.Item
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your Lastname!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Lastname"
            />
          </Form.Item>
        </Col>
      </Row>
    </AuthRoutesAnimation>
  );
}

export default Step1;
