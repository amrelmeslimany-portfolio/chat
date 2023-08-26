import { Card, Empty, List, Result, Tag } from "antd";
import React from "react";
import ScrollWrapper from "../UI/ScrollWrapper";
import { EmptyList } from "../../constants/images";
import classes from "./ProfileListsLayout.module.css";

const ProfileListsLayout = ({
  title,
  extra,
  bodyStyle,
  data,
  empty,
  loading,
  error,
  renderItem,
  ...props
}) => {
  return (
    <Card
      extra={<Tag bordered={false}>{extra}</Tag>}
      bordered={false}
      bodyStyle={{ ...bodyStyle, padding: 15 }}
      title={title}
      className={classes.listCardWrapper}
      {...props}
    >
      {error && <Result status="error" subTitle={error} />}
      {!error && (
        <ScrollWrapper style={{ minHeight: "100%" }} maxHeight="100%">
          <List
            loading={loading}
            style={{ height: "100%" }}
            size="small"
            itemLayout="horizontal"
            dataSource={data}
            locale={{
              emptyText: (
                <Empty
                  style={{ marginTop: 20 }}
                  description={empty}
                  image={<img src={EmptyList} />}
                />
              ),
            }}
            renderItem={renderItem}
          />
        </ScrollWrapper>
      )}
    </Card>
  );
};

export default ProfileListsLayout;
