import { forwardRef } from "react";
import Simplebar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const ScrollWrapper = forwardRef(
  ({ maxHeight, style, children, ...others }, ref) => {
    return (
      <Simplebar
        ref={ref}
        style={{ maxHeight: maxHeight || "100dvh", ...style }}
        {...others}
      >
        {children}
      </Simplebar>
    );
  }
);
export default ScrollWrapper;
