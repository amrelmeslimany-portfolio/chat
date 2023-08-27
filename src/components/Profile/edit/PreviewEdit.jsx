import React from "react";
import DetailsHeader from "../../Users/friend/DetailsHeader";
import DetailsBody from "../../Users/friend/body/DetailsBody";
import { Divider, Typography } from "antd";
import classes from "./PreviewEdit.module.css";
import useDocHeight from "../../../hooks/useDocHeight";

const PreviewEdit = ({ user }) => {
  const docHeigh = useDocHeight();
  return (
    <div className={classes.editPreviewWrap} style={{ height: docHeigh }}>
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
