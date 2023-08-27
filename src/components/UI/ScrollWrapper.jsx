import { forwardRef } from "react";
import Simplebar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import useDocHeight from "../../hooks/useDocHeight";

const ScrollWrapper = forwardRef(
  ({ maxHeight, style, children, ...others }, ref) => {
    const docHeight = useDocHeight();
    return (
      <Simplebar
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
