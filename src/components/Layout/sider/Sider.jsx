import { Avatar, Layout, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LightIcon from "remixicon-react/SunLineIcon";
import DarkIcon from "remixicon-react/MoonLineIcon";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { changeMode } from "../../../store/global/globalSlice";
import ScrollWrapper from "../../UI/ScrollWrapper";
import { routes } from "../../../constants/routes";
import { LogoImg } from "../../../constants/images";
import { MAX992 } from "../../../constants/breakpoints";
import SiderMenu from "./SiderMenu";
import { motion } from "framer-motion";
import classes from "./Sider.module.css";
import useDocHeight from "../../../hooks/useDocHeight";

const Sider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const docHeight = useDocHeight();
  const { user } = useSelector((state) => state.auth);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const { darkMode, isSiderOpen } = useSelector((state) => state.global);
  const isTablet = useMediaQuery(MAX992);

  useEffect(() => {
    if (isTablet) setCollapsedWidth(0);
    else setCollapsedWidth(80);
  }, [isTablet]);

  return (
    <motion.div
      initial={false}
      animate={{ width: isSiderOpen ? 80 : collapsedWidth }}
    >
      <ScrollWrapper>
        <Layout.Sider
          className={classes.ant_layout_sider}
          style={{ minHeight: docHeight - 72 - 50 }}
          collapsed
          collapsedWidth={isSiderOpen ? 80 : collapsedWidth}
        >
          <Space direction="vertical">
            <Avatar
              onClick={() => navigate(routes.profile)}
              shape="circle"
              size="large"
              src={user.profileImg}
              className={`nodark ${classes.profile_img}`}
            />
            <SiderMenu user={user} navigate={navigate} />
          </Space>
        </Layout.Sider>
        <Space direction="vertical" className={classes.themain_logo}>
          <Switch
            checked={darkMode}
            unCheckedChildren={<LightIcon className={classes.lightmode} />}
            checkedChildren={<DarkIcon className={classes.darkmode} />}
            onChange={(_) => dispatch(changeMode())}
          />
          <img src={LogoImg} className="nodark" width={30} />
        </Space>
      </ScrollWrapper>
    </motion.div>
  );
};

export default Sider;
