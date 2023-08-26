import { Segmented } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { usersThunk } from "../../store/users/userThunks";
import { useSearchParams } from "react-router-dom";

const SwitchUsers = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [option, setOption] = useState("others");

  const onChange = (value) => {
    if (searchQuery.has("q")) {
      searchQuery.delete("q");
      setSearchQuery(searchQuery);
    }
    setOption(value);
    dispatch(usersThunk(value));
  };

  return (
    <Segmented
      style={{ marginBottom: 15 }}
      block
      options={["others", "friends", "all"]}
      value={option}
      onChange={onChange}
    />
  );
};

export default SwitchUsers;
