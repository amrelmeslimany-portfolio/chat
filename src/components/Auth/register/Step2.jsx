import { IdcardOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row, Select, Tooltip } from "antd";
import { sub } from "date-fns";
import CountriesSelect from "../../UI/CountriesSelect";
import { AuthRoutesAnimation } from "../../UI/Animation";
import { onDisabledDate } from "../../../utils/functions";
import dayjs from "dayjs";

function Step2() {
  return (
    <AuthRoutesAnimation>
      <Row wrap gutter={[5, 5]}>
        <Col span={24}>
          <Form.Item
            hasFeedback
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              {
                pattern: /([a-z])([._])?([1-9])/g,
                message:
                  "Must contians letters and numbers and mybe underscore and dot",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<IdcardOutlined />}
              placeholder="Username"
              suffix={
                <Tooltip title="example: user_45">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
          </Form.Item>
        </Col>
        <Col sm={{ span: 12 }} span={24}>
          <Form.Item
            name="birthday"
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
              format="YYYY/MM/DD"
              defaultValue={dayjs(new Date("2001-08-13T17:13:14.735Z"))}
            />
          </Form.Item>
        </Col>
        <Col sm={{ span: 12 }} span={24}>
          <Form.Item
            name="gender"
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
        </Col>
        <Col span={24}>
          <CountriesSelect />
        </Col>
      </Row>
    </AuthRoutesAnimation>
  );
}

export default Step2;
