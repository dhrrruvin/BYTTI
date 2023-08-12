import React from "react";
import "./Navbar.css";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, redirect } from "react-router-dom";

const Navbar = () => {
  const { authUser, isLoggedIn, logout } = useAuth();

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="nav-psngdetails">
      {isLoggedIn ? (
        <p id="user-name-psngdetails">Welcome, {authUser}</p>
      ) : null}
      {isLoggedIn ? (
        <button id="logout-btn-psngdetails" onClick={(e) => handleLogOut(e)}>
          Log Out
        </button>
      ) : null}
    </div>
  );
};

export default Navbar;
