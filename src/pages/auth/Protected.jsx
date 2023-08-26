import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../constants/routes";

function Protected({ user }) {
  if (!user) return <Navigate to={routes.login} />;
  return <Outlet />;
}

export default Protected;
