import { Avatar, Button, List } from "antd";
import React from "react";

const ProfileListsItem = ({ user, description, onClick, buttonText }) => {
  return (
    <List.Item
      extra={
        <Button
          size="small"
          type="primary"
          children={buttonText}
          onClick={onClick}
        />
      }
    >
      <List.Item.Meta
        avatar={
          <Avatar
            style={{ border: "1px solid gray", width: 38, height: 38 }}
            className="nodark"
            src={user.profileImg}
          />
        }
        title={user.fullname}
        description={description}
      />
    </List.Item>
  );
};

export default ProfileListsItem;
