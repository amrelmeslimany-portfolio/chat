import { theme } from "antd";
import { Link } from "react-router-dom";

function CustomLink({ to, isFull, children, ...props }) {
  const { token } = theme.useToken();
  return (
    <Link
      style={{
        color: token.colorText,
        textDecoration: "none",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: token.colorPrimary,
        padding: token.paddingXS,
        borderRadius: token.borderRadius,
        display: isFull && "block",
        textAlign: "center",
      }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
