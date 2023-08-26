import React from "react";
import DetailsHeader from "../../Users/friend/DetailsHeader";
import DetailsBody from "../../Users/friend/body/DetailsBody";
import { Divider, Typography } from "antd";
import classes from "./PreviewEdit.module.css";

const PreviewEdit = ({ user }) => {
  return (
    <div className={classes.editPreviewWrap}>
      <Typography.Title
        level={5}
        style={{ textAlign: "left" }}
        children="Preview"
      />
      <Divider />
      <DetailsHeader
        avatar={user.profileImg}
        bio={user.bio}
        fullname={user.fullname || user.fullName}
        username={user.username}
      />
      <DetailsBody user={user} />
    </div>
  );
};

export default PreviewEdit;
