import React from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import { Divider } from "antd";
import ScrollWrapper from "../../components/UI/ScrollWrapper";
import BlockList from "../../components/Profile/BlockList";
import MostChatingList from "../../components/Profile/MostChatingList";
import { useSelector } from "react-redux";
import HelmetWrap from "../../components/UI/HelmetWrap";
import { useMediaQuery } from "react-responsive";
import classes from "./profile.module.css";
import { MAX992 } from "../../constants/breakpoints";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const is992 = useMediaQuery(MAX992);
  return (
    <>
      <HelmetWrap title={`${user.fullname || user.fullName}'s Profile`} />
      <ScrollWrapper
        maxHeight={is992 && "calc(100dvh - 52px)"}
        style={{ padding: 15 }}
      >
        <div className={classes.profileWrapp}>
          <div className={classes.infowrap}>
            <ProfileHeader />
            <Divider>Information</Divider>
            <ProfileInfo />
          </div>

          <div className={classes.listsWrapp}>
            <MostChatingList />
            <BlockList />
          </div>
        </div>
      </ScrollWrapper>
    </>
  );
};

export default Profile;
