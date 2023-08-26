import { Card, Statistic, theme } from "antd";
import "./BodyItem.css";

const BodyItem = ({ title, icon: Icon, value }) => {
  const { token } = theme.useToken();
  return (
    <Card
      style={{ backgroundColor: token.colorBgBase }}
      bordered={false}
      size="small"
      className="itemparent"
    >
      <Statistic
        style={{ textAlign: "start" }}
        suffix={<Icon style={{ marginLeft: 15 }} />}
        title={title}
        value={value}
        className="staticstyle"
      />
    </Card>
  );
};

export default BodyItem;
