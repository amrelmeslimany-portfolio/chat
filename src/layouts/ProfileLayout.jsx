import { Layout } from "antd";
import React from "react";
import Sider from "../components/Layout/sider/Sider";
import { Outlet } from "react-router-dom";
import { AuthRoutesAnimation } from "../components/UI/Animation";
import { useMediaQuery } from "react-responsive";
import { MAX992 } from "../constants/breakpoints";
import TopNavbar from "../components/Layout/sider/TopNavbar";

const ProfileLayout = () => {
  const is992 = useMediaQuery(MAX992);
  return (
    <Layout hasSider>
      <Sider />
      <Layout.Content>
        {is992 && <TopNavbar width="100%" />}
        <AuthRoutesAnimation>
          <Outlet />
        </AuthRoutesAnimation>
      </Layout.Content>
    </Layout>
  );
};

export default ProfileLayout;
