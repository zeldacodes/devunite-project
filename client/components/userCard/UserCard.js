import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <img src={user.imageURL} className="user-image" />
      <div>{user.username}</div>
      <div>{user.email}</div>
    </div>
  );
};

export default UserCard;
