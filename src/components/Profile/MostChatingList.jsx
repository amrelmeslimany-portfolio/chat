import React, { useEffect, useState } from "react";
import ProfileListsLayout from "./ProfileListsLayout";
import { numberWithZero } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mostChatsThunk } from "../../store/users/userThunks";
import ProfileListsItem from "./ProfileListsItem";
import { setCurrentConversation } from "../../store/conversations/conversationSlice";
import { insertMostChats } from "../../store/users/usersSlice";

const MostChatingList = () => {
  const dispatch = useDispatch();
  const { mostChatsUsers } = useSelector((state) => state.users);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onVisit = (item) => {
    navigate("/");
    dispatch(
      setCurrentConversation({
        id: item._id,
        friend: item.friend,
        isMessage: Boolean(item.messageCount),
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    dispatch(mostChatsThunk())
      .unwrap()
      .then((users) => dispatch(insertMostChats(users.users)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProfileListsLayout
      loading={loading}
      error={error}
      data={mostChatsUsers}
      bodyStyle={{ height: 228, overflow: "hidden" }}
      empty="No most chats"
      title="Most Chats"
      extra={numberWithZero(mostChatsUsers.length || 0)}
      renderItem={(item) => (
        <ProfileListsItem
          user={item.friend}
          description={`${numberWithZero(item.messageCount)} message`}
          buttonText="Visit"
          onClick={() => onVisit(item)}
          key={item._id}
        />
      )}
    />
  );
};

export default MostChatingList;
