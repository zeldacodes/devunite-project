import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth?.user?.username);
  console.log("username", username);

  return (
    <div>
      <h3>Welcome, {username}!</h3>
      <p>
        {" "}
        Welcome to our web development community! This is a place where you can
        connect with other talented developers and collaborate on exciting
        projects together!
      </p>
    </div>
  );
};

export default Home;
