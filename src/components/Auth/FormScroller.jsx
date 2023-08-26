import { theme } from "antd";
import ScrollWrapper from "../UI/ScrollWrapper";

const FormScroller = ({ flex, paddingBlock, children }) => {
  const { token } = theme.useToken();
  return (
    <ScrollWrapper
      style={{
        backgroundColor: token.colorBgContainer,
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        justifyContent: "center",
        flex: flex || 1,
        padding: `${paddingBlock || "10%"} 50px`,
      }}
    >
      {children}
    </ScrollWrapper>
  );
};

export default FormScroller;
