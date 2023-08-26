import { useEffect, useRef, useState } from "react";
import { Divider, Form, Steps, message } from "antd";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "../../../constants/routes";
import AuthHeader from "../authHeader";
import CustomLink from "../../UI/CustomLink";
import classes from "./registerForm.module.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import StepActions from "./StepActions";
import { useSelector, useDispatch } from "react-redux";
import { useSignal } from "../../../hooks/useSignal";
import { registerThunk } from "../../../store/auth/authThunks";
import { clearAuth } from "../../../store/auth/authSlice";
import StatusHandler from "../../UI/StatusHandler";
import { STATUS } from "../../../constants/words";
import { scrollToElement } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";
import HelmetWrap from "../../UI/HelmetWrap";
import dayjs from "dayjs";

const STEPS_PROGRESS = [
  {
    title: "Profile",
  },
  {
    title: "INFO",
  },
  {
    title: "Security",
  },
];

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parentRef = useRef();
  const { status, user, error } = useSelector((state) => state.auth);
  const { signal } = useSignal(clearAuth);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [<Step1 file={formValues.image} />, <Step2 />, <Step3 />];

  const onPrevious = () => setCurrentStep((prev) => prev - 1);

  const onNext = () => {
    form.validateFields().then((values) => {
      setFormValues((prev) => ({ ...prev, ...values }));
      setCurrentStep((prev) => prev + 1);
    });
  };

  const onSubmit = ({ password }) => {
    const formdata = new FormData();
    formdata.append("password", password);
    for (const key in formValues) {
      const value = formValues[key];
      if (!value) continue;
      if (key == "image" && value) {
        formdata.append(key, value.file);
        continue;
      }
      if (key == "birthday") {
        formdata.append(key, value.$d);
        continue;
      }
      formdata.append(key, value);
    }

    dispatch(registerThunk({ user: formdata, signal }));
    scrollToElement(parentRef.current);
  };

  useEffect(() => {
    if (status == STATUS.success && user) {
      navigate("/", { replace: true });
      toast.success("Account Created Successfully");
    }
  }, [status, user]);

  return (
    <motion.div ref={parentRef}>
      <HelmetWrap title="Register" />
      <AuthHeader title="Join Us" paragraph="Create new account and enjoy" />
      <StatusHandler error={error} status={status} />
      <Steps current={currentStep} items={STEPS_PROGRESS} />
      <Form
        form={form}
        className={classes.form}
        onFinish={onSubmit}
        disabled={status === STATUS.loading}
        initialValues={{
          remember: true,
        }}
      >
        <AnimatePresence>{steps[currentStep]}</AnimatePresence>
        <StepActions
          currentStep={currentStep}
          stepsSize={steps.length}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </Form>
      <Divider>or</Divider>
      <CustomLink isFull to={routes.login}>
        Login Now
      </CustomLink>
    </motion.div>
  );
}

export default RegisterForm;
