import { CalendarFilled, FlagFilled, ManOutlined } from "@ant-design/icons";
import { Divider, Space } from "antd";
import { format } from "date-fns";
import BodyItem from "./BodyItem";
import { DATE_FORMAT } from "../../../../constants/words";
const PARENTSTYLE = {
  padding: "0 15px",
  width: "calc(100% - (15px * 2))",
};

const DetailsBody = ({ user }) => {
  return (
    <>
      <Divider />
      <Space direction="vertical" style={PARENTSTYLE}>
        <BodyItem title="Country" value={user.counrty} icon={FlagFilled} />
        <BodyItem title="Gender" value={user.gender} icon={ManOutlined} />
        <BodyItem
          title="Birthday"
          value={format(new Date(user.birthday), DATE_FORMAT)}
          icon={CalendarFilled}
        />
      </Space>
    </>
  );
};

export default DetailsBody;
