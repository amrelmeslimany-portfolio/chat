import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = ({ user }) => {
  if (user) return <Navigate to="/" />;
  return <Outlet />;
};

export default AuthRedirect;
