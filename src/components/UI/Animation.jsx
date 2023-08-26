import { motion } from "framer-motion";

const tranlsateANM = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};
const opacityANM = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const AuthRoutesAnimation = ({ onlyOpacity, children, ...props }) => {
  return (
    <motion.div
      variants={onlyOpacity ? opacityANM : tranlsateANM}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      {...props}
    >
      {children}
    </motion.div>
  );
};
