import { Avatar, Button, Card, Space, Tag, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { usePalette } from "color-thief-react";
import { IMG_HOSTING } from "../../constants/words";
import "./ProfileHeader.css";

const ThiefColorOptions = {
  crossOrigin: IMG_HOSTING,
};

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: imgColor } = usePalette(
    user.profileImg,
    2,
    "hex",
    ThiefColorOptions
  );

  return (
    <Card className="profile-header" bordered={false} size="small">
      <div
        style={{
          backgroundColor: imgColor && imgColor[0],
          backgroundImage: `url(${user.profileImg})`,
        }}
        className="cover"
      ></div>
      <Space>
        <div className="wrapinfo">
          <div className="img">
            <Avatar src={user.profileImg} size="large" className="nodark" />
          </div>
          <div className="infos">
            <Typography.Title level={3}>
              {user.fullname || user.fullName}
            </Typography.Title>
            <Tag bordered={false}>@{user.username}</Tag>
            <Typography.Paragraph className="mb0">
              {user.bio}
            </Typography.Paragraph>
          </div>
        </div>

        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => navigate(routes.profileEdit)}
        />
      </Space>
    </Card>
  );
};

export default ProfileHeader;
