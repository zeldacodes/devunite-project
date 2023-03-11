import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth?.user?.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    // dispatch(logout());
    localStorage.clear();
    windows.location = "/login";
  };

  return (
    <div>
      <h1 className="title">DevUnite</h1>
      <nav>
        {isLoggedIn ? (
          <div className="link-wrapper">
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/users">Users</Link>
            <Link to="/login" onClick={logoutAndRedirectHome}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="link-wrapper">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            {/* <Link to="/users">Users</Link> */}
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
