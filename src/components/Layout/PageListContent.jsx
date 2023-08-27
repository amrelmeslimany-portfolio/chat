import { theme } from "antd";
import classes from "./PageListContent.module.css";
import ScrollWrapper from "../UI/ScrollWrapper";
import { Outlet } from "react-router-dom";
import Search from "../Search/Search";
import TopNavbar from "./sider/TopNavbar";
import { useMediaQuery } from "react-responsive";
import { MAX768, MAX992 } from "../../constants/breakpoints";
import { AuthRoutesAnimation } from "../UI/Animation";
import useDocHeight from "../../hooks/useDocHeight";

const PageListContent = ({ is640 }) => {
  const { token } = theme.useToken();
  const docHeight = useDocHeight();
  const isTablet = useMediaQuery(MAX992);
  const isSmallTablet = useMediaQuery(MAX768);
  const parentWidth = is640 ? "100%" : isSmallTablet ? 280 : 350;
  return (
    <AuthRoutesAnimation style={{ width: is640 && "100%" }}>
      {isTablet && <TopNavbar width={parentWidth} />}
      <ScrollWrapper
        // maxHeight={isTablet && docHeight - 52} // "calc(100vh - 52px)"

        style={{
          backgroundColor: token.colorBgContainer,
          width: parentWidth,
          height: docHeight - 52,
        }}
        className={classes.chatsuserslist_wrapper}
      >
        <div>
          <Search />
          <Outlet />
        </div>
      </ScrollWrapper>
    </AuthRoutesAnimation>
  );
};

export default PageListContent;
