import { AuthRoutesAnimation } from "../../components/UI/Animation";
import { AuthChatImg } from "../../constants/images";
import classes from "./login.module.css";
import FormScroller from "../../components/Auth/FormScroller";
import RegisterForm from "../../components/Auth/register/registerForm";
import useDocHeight from "../../hooks/useDocHeight";

const Register = () => {
  const docHeight = useDocHeight();
  return (
    <AuthRoutesAnimation>
      <div className={classes.auth_layout} style={{ height: docHeight }}>
        <div className={classes.imgcover}>
          <img src={AuthChatImg} alt="cover" />
        </div>
        <FormScroller paddingBlock="3.5%" flex="1 1 8%">
          <RegisterForm />
        </FormScroller>
      </div>
    </AuthRoutesAnimation>
  );
};

export default Register;
