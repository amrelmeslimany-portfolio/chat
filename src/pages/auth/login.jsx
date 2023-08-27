import { AuthChatImg } from "../../constants/images";
import LoginForm from "../../components/Auth/loginForm";
import classes from "./login.module.css";
import { motion } from "framer-motion";
import FormScroller from "../../components/Auth/FormScroller";
import useDocHeight from "../../hooks/useDocHeight";

const imgAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const formAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const Login = () => {
  const docHeight = useDocHeight();
  return (
    <div className={classes.auth_layout} style={{ height: docHeight }}>
      <FormScroller>
        <motion.div
          transition={{ delay: 0.2 }}
          variants={formAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoginForm />
        </motion.div>
      </FormScroller>

      <motion.div
        className={classes.imgcover}
        variants={imgAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <img src={AuthChatImg} alt="cover" />
      </motion.div>
    </div>
  );
};

export default Login;
