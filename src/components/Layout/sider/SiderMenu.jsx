import { Menu } from "antd";
import { toast } from "react-toastify";
import UsersIcon from "remixicon-react/GroupFillIcon";
import EditIcon from "remixicon-react/UserSettingsFillIcon";
import DiscussIcon from "remixicon-react/DiscussFillIcon";
import LogoutIcon from "remixicon-react/LogoutBoxFillIcon";
import { logoutThunk } from "../../../store/auth/authThunks";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routes } from "../../../constants/routes";

const menuItem = (key = "", icon, onClick) => ({
  key,
  itemIcon: icon,
  onClick,
});

const menuItems = (navigate, dispatch, user) => [
  { type: "divider" },
  menuItem(
    "/",
    <DiscussIcon size={20} style={{ verticalAlign: "middle" }} />,
    () => navigate("/")
  ),
  menuItem(
    "/users",
    <UsersIcon size={20} style={{ verticalAlign: "middle" }} />,
    () => navigate(routes.users)
  ),
  { type: "divider" },
  menuItem(
    routes.profileEdit,
    <EditIcon size={20} style={{ verticalAlign: "middle" }} />,
    () => navigate(routes.profileEdit)
  ),
  menuItem(
    "/logout",
    <LogoutIcon size={20} style={{ verticalAlign: "middle" }} />,
    () => {
      dispatch(logoutThunk())
        .unwrap()
        .then((msg) => {
          toast.success(msg);
          navigate(0);
        })
        .catch((error) => toast.error(error));
    }
  ),
];

const SiderMenu = ({ user, navigate }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Menu
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "transparent", borderInlineEnd: "none" }}
      items={menuItems(navigate, dispatch, user)}
    />
  );
};

export default SiderMenu;
