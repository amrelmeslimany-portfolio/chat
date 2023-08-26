import { AuthRoutesAnimation } from "../../components/UI/Animation";
import { AuthChatImg } from "../../constants/images";
import classes from "./login.module.css";
import FormScroller from "../../components/Auth/FormScroller";
import RegisterForm from "../../components/Auth/register/registerForm";

const Register = () => {
  return (
    <AuthRoutesAnimation>
      <div className={classes.auth_layout}>
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
