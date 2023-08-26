import { Card, Descriptions } from "antd";
import { useSelector } from "react-redux";
import { differenceInYears, format } from "date-fns";
import { DATE_FORMAT } from "../../constants/words";
import { handleDate } from "../../utils/functions";

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const birthDate = new Date(user.birthday);
  const items = [
    {
      key: "1",
      label: "Username",
      children: "@" + user.username,
    },
    {
      key: "2",
      label: "Country",
      children: user.counrty,
    },
    {
      key: "3",
      label: "Gender",
      children: user.gender,
    },
    {
      key: "4",
      label: "Birthday",
      children: format(birthDate, DATE_FORMAT),
    },
    {
      key: "5",
      label: "Age",
      children: differenceInYears(new Date(), birthDate) + " year",
    },
    {
      key: "6",
      label: "Created At",
      children: handleDate(user.createdAt),
    },
  ];
  return (
    <Card size="small" bordered={false}>
      <Descriptions layout="vertical" bordered={false}>
        {items.map((item) => (
          <Descriptions.Item
            contentStyle={{
              textTransform: item.label !== "Username" && "capitalize",
            }}
            key={item.key}
            label={item.label}
            span={item.span}
          >
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};

export default ProfileInfo;
