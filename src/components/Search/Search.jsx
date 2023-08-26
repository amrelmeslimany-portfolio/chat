import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchThunk } from "../../store/global/globalThunks";
import { toast } from "react-toastify";
import { addSearchedUsers } from "../../store/users/usersSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const Search = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onSearch = (value) => {
    const filtered = value.trim();
    if (filtered.length > 0) {
      if (location.pathname !== routes.users)
        navigate(`${routes.users}?q=${filtered}`);
      setLoading(true);
      dispatch(searchThunk(filtered))
        .unwrap()
        .then(({ users }) => dispatch(addSearchedUsers(users)))
        .catch((error) => toast.error(error))
        .catch(() => setLoading(false));
    }
  };
  return (
    <Input.Search
      loading={loading}
      bordered={false}
      onSearch={onSearch}
      allowClear
      placeholder="Search..."
      enterButton={<Button type="primary" icon={<SearchOutlined />} />}
    />
  );
};

export default Search;
