import { Avatar, Tag, Typography } from "antd";
import classes from "./DetailsHeader.module.css";

function DetailsHeader({ fullname, username, bio, avatar }) {
  return (
    <div className={classes.imgBox}>
      <Avatar src={avatar} shape="circle" className={`${classes.img} nodark`} />
      <Typography.Title level={4} className={`${classes.name}`}>
        {fullname}
      </Typography.Title>
      <Tag color="red" bordered={false}>
        {username}
      </Tag>
      <Typography.Paragraph className={`mb0 ${classes.mt}`}>
        {bio}
      </Typography.Paragraph>
    </div>
  );
}

export default DetailsHeader;
