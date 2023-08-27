import { motion } from "framer-motion";
import { Spin, theme } from "antd";

const ANIMATION = {
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 100,
  },
};

const GlobalLoading = () => {
  const { token } = theme.useToken();
  return (
    <motion.div
      variants={ANIMATION}
      initial={false}
      animate="animate"
      exit="exit"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        height: "100%",
        width: "100%",
        zIndex: 99999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: token.colorBgBase,
      }}
    >
      <Spin />
    </motion.div>
  );
};

export const NormalLoading = () => {
  return (
    <div className="txtcenter">
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoading;
