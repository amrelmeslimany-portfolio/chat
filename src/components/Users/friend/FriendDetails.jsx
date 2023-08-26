import { Button, Drawer, Result, theme } from "antd";
import DetailsHeader from "./DetailsHeader";
import DetailsBody from "./body/DetailsBody";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userDetailsThunk } from "../../../store/users/userThunks";
import { NormalLoading } from "../../UI/Loading";

const FriendDetails = ({ isOpen, onClose, userId }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(userDetailsThunk(userId))
      .unwrap()
      .then((user) => setUser(user))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <Drawer
      title="Friend Information"
      placement="right"
      headerStyle={{ border: "none" }}
      width={350}
      closable={false}
      destroyOnClose={true}
      open={isOpen}
      style={{ backgroundColor: token.colorBgContainer }}
      extra={
        <Button
          size="small"
          icon={<CloseOutlined />}
          shape="circle"
          type="text"
          onClick={onClose}
        />
      }
    >
      {loading && <NormalLoading />}
      {!loading && error && <Result status="error" subTitle={error} />}
      {!loading && !error && user && (
        <>
          <DetailsHeader
            avatar={user.profileImg}
            bio={user.bio}
            fullname={user.fullname || `${user.firstname} ${user.lastname}`}
            username={user.username}
          />
          <DetailsBody user={user} />
        </>
      )}
    </Drawer>
  );
};

export default FriendDetails;
