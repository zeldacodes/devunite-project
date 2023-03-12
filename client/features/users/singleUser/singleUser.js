import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUser,
  followUser,
  unFollowUser,
} from "../singleUser/singleUserSlice";

const SingleUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUser.user);
  const status = useSelector((state) => state.singleUser.status);
  const error = useSelector((state) => state.singleUser.error);

  const loggedInUser = useSelector((state) => state.auth.user);

  const isFollowing = user.followers?.some(
    (follower) => follower.id === loggedInUser.id
  );

  const [buttonText, setButtonText] = useState(
    isFollowing ? "Unfollow" : "Follow"
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSingleUser(userId));
    }
    setButtonText(isFollowing ? "Unfollow" : "Follow");
  }, [status, dispatch, userId]);

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(followUser(user.username));
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    dispatch(unFollowUser(user.username));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  if (status === "succeeded") {
    return (
      <div>
        <img src={user.imageURL} />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
        <p>{user.skills}</p>
        {user.id == loggedInUser.id ? null : (
          <div className="follow-button">
            <button
              type="button"
              onClick={isFollowing ? handleUnFollow : handleFollow}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default SingleUser;
