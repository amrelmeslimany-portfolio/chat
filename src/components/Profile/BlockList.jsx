import React, { useEffect, useState } from "react";
import { numberWithZero } from "../../utils/functions";
import ProfileListsLayout from "./ProfileListsLayout";
import { toast } from "react-toastify";
import ProfileListsItem from "./ProfileListsItem";
import { useDispatch } from "react-redux";
import { blockUserThunk, getBlockedThunk } from "../../store/users/userThunks";
import { updateBlockedConversation } from "../../store/conversations/conversationSlice";
import { updateIsBlockUser } from "../../store/users/usersSlice";

const BlockList = () => {
  const dispatch = useDispatch();
  const [blocked, setBlocked] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onUnblock = (userId) => {
    setLoading(true);
    dispatch(blockUserThunk(userId))
      .unwrap()
      .then((item) => {
        toast.success("Unblocked Success");
        dispatch(updateBlockedConversation(item));
        dispatch(updateIsBlockUser(item));
        setBlocked((prev) => {
          let newBlocked = prev.blockedUsers.filter(
            (currentBlock) => currentBlock.userId !== userId
          );
          return { total: prev.total - 1, blockedUsers: newBlocked };
        });
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getBlockedThunk())
      .unwrap()
      .then((users) => setBlocked(users))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProfileListsLayout
      loading={loading}
      error={error}
      bodyStyle={{ height: 250, overflow: "hidden" }}
      data={blocked.blockedUsers}
      empty="No blocked users"
      title="Block List"
      extra={numberWithZero(blocked.total)}
      renderItem={(item) => (
        <ProfileListsItem
          buttonText="Unblock"
          onClick={() => onUnblock(item.userId)}
          key={item._id}
          user={item}
        />
      )}
    />
  );
};

export default BlockList;
