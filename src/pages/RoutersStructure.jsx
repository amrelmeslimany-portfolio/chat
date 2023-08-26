import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "../constants/routes";
import Login from "./auth/login";
import MainLayout from "../layouts/MainLayout";
import Register from "./auth/register";
import Conversation from "./conversations";
import Users from "./users";
import Protected from "./auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginThunk } from "../store/auth/authThunks";
import ProfileLayout from "../layouts/ProfileLayout";
import Profile from "./profile/profile";
import EditProfile from "./profile/edit";
import GlobalLoading from "../components/UI/Loading";
import { socket } from "../constants/socket-client";
import { insertOnlineUsers } from "../store/users/usersSlice";
import AuthRedirect from "./auth/AuthRedirect";

const RouterStructure = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      dispatch(checkLoginThunk())
        .unwrap()
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("setup", user._id);
      socket.on("online users", (users) => {
        dispatch(insertOnlineUsers(users));
      });
    }
    return () => {
      socket.off("online users");
    };
  }, [user]);

  return (
    <>
      {loading && <GlobalLoading />}
      <Routes key={location.pathname} location={location}>
        <Route element={<AuthRedirect user={user} />}>
          <Route
            path={routes.login}
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path={routes.register}
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Route>
        <Route element={<Protected user={user} />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Conversation />} />
            <Route path={routes.users} element={<Users />} />
          </Route>
          <Route element={<ProfileLayout />}>
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.profileEdit} element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouterStructure;
