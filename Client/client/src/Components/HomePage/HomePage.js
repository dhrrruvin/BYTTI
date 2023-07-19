import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import destinationImage from "./destination-icon.gif";
import locationImage from "./location.gif";
import swapImage from "./swap.svg";
import useFetch from "../../hooks/useFetch";
import List from "./List/List";
import { useAuth } from "../../Contexts/AuthContext";

const HomePage = () => {
  const { data, setData } = useFetch();
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [isDropDownVisible, setIsDropDownVisible] = useState({
    input1: false,
    input2: false,
  });

  const [selectedItem, setSelectedItem] = useState({ input1: "", input2: "" });

  const handleFocus = (inputId) => {
    setIsDropDownVisible((prevState) => ({
      ...prevState,
      [inputId]: true,
    }));
  };

  const handleItemClick = (text, inputId) => {
    setSelectedItem((prevSelectedItems) => ({
      ...prevSelectedItems,
      [inputId]: text,
    }));

    setIsDropDownVisible((prevState) => ({
      ...prevState,
      [inputId]: false,
    }));
  };

  const handleBlur = (inputId) => {
    setIsDropDownVisible((prevState) => ({
      ...prevState,
      [inputId]: false,
    }));
  };

  const handleInputChange = (e, inputId) => {
    setData({ ...data, slug: e.target.value });
    handleFocus(inputId);
    setSelectedItem((prevSelectedItems) => ({
      ...prevSelectedItems,
      [inputId]: e.target.value,
    }));
  };

  const swapStations = () => {
    setSelectedItem({
      input1: selectedItem.input2,
      input2: selectedItem.input1,
    });
  };

  const logout = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="header">
        {isLoggedIn ? <span id="user-name">Welcome, {authUser}</span> : null}
        <br />
        {isLoggedIn ? (
          <button id="logout-btn" onClick={(e) => logout(e)}>
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login">
              <button id="login-btn">Log In</button>
            </Link>
            <Link to="/signup">
              <button id="register-btn">Register</button>
            </Link>
          </>
        )}
      </div>
      <div className="entry-title-div">
        <h1 id="entry-title">Railway Ticket Booking System</h1>
      </div>
      <div className="main">
        <div className="search-input">
          <input
            type="text"
            placeholder="from"
            id="input-1"
            onChange={(e) => handleInputChange(e, "input1")}
            onBlur={() => handleBlur("input1")}
            value={selectedItem.input1}
          />
          <img className="icon" src={locationImage} alt="location-icon" />
          {isDropDownVisible.input1 && selectedItem.input1 && (
            <List
              stations={data.results}
              handleItemClick={(text) => handleItemClick(text, "input1")}
            />
          )}
        </div>
        <div className="swap-btn-div">
          <img
            id="swap-img"
            src={swapImage}
            alt="swap-stations"
            onClick={() => swapStations()}
          />
        </div>
        <div className="search-input-2">
          <input
            type="text"
            placeholder="to"
            id="input-2"
            onChange={(e) => handleInputChange(e, "input2")}
            onBlur={() => handleBlur("input2")}
            value={selectedItem.input2}
          />
          <img className="icon" src={destinationImage} alt="location-icon" />
          {isDropDownVisible.input2 && selectedItem.input2 && (
            <List
              stations={data.results}
              handleItemClick={(text) => handleItemClick(text, "input2")}
            />
          )}
        </div>
        <div className="search-btn-div">
          <Link to="/available-trains" state={{ data: selectedItem }}>
            <button id="search-btn" type="submit">
              search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
