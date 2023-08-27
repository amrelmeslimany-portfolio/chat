import { forwardRef } from "react";
import Simplebar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import useDocHeight from "../../hooks/useDocHeight";
import classes from "./ScrollWrapper.module.css";
const ScrollWrapper = forwardRef(
  ({ maxHeight, style, children, ...others }, ref) => {
    const docHeight = useDocHeight();
    return (
      <Simplebar
        className={`${others.className ? others.className : ""} ${
          classes.scrollPhonesScreen
        }`}
        ref={ref}
        style={{ maxHeight: maxHeight || docHeight, ...style }} // "100vh"
        {...others}
      >
        {children}
      </Simplebar>
    );
  }
);
export default ScrollWrapper;
