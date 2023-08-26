import { Empty, List } from "antd";
import DividerCounter from "../components/UI/DividerCounter";
import UserItem from "../components/Users/user/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { usersThunk } from "../store/users/userThunks";
import { STATUS } from "../constants/words";
import { numberWithZero } from "../utils/functions";
import { NormalLoading } from "../components/UI/Loading";
import SwirchUsers from "../components/Users/SwitchUsers";
import { AnimatePresence } from "framer-motion";
import { AuthRoutesAnimation } from "../components/UI/Animation";
import { EmptyList } from "../constants/images";
import { useSearchParams } from "react-router-dom";
import HelmetWrap from "../components/UI/HelmetWrap";

const Users = () => {
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const { status, error, users, onlines } = useSelector((state) => state.users);

  useEffect(() => {
    if (!query.has("q")) dispatch(usersThunk("others"));
  }, [query]);

  return (
    <>
      <HelmetWrap title="Users" />
      <DividerCounter
        text="Users"
        counter={
          status === STATUS.success
            ? numberWithZero(users.users?.length)
            : "error"
        }
      />
      <SwirchUsers />

      {status === STATUS.loading && <NormalLoading />}
      {status === STATUS.error && <p>{error}</p>}

      {status === STATUS.success && (
        <>
          <List itemLayout="horizontal">
            <AnimatePresence mode="sync">
              {users.users?.length > 0 &&
                users.users?.map((user, index) => (
                  <UserItem
                    key={user._id}
                    index={index}
                    user={{ ...user, isOnline: onlines.includes(user._id) }}
                  />
                ))}
              {users.users?.length === 0 && (
                <AuthRoutesAnimation>
                  <Empty
                    description="No users"
                    image={<img src={EmptyList} />}
                  />
                </AuthRoutesAnimation>
              )}
            </AnimatePresence>
          </List>
        </>
      )}
    </>
  );
};

export default Users;
