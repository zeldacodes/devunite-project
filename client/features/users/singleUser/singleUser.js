import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "../singleUser/singleUserSlice";

const SingleUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUser.user);
  const status = useSelector((state) => state.singleUser.status);
  const error = useSelector((state) => state.singleUser.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSingleUser(userId));
    }
  }, [status, dispatch, userId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  if (status === "succeeded") {
    return (
      <div>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
        <p>{user.skills}</p>
      </div>
    );
  }
};

export default SingleUser;
