import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import List from "../HomePage/List/List";
import "./Navbar.css";
import swapImage from "../HomePage/swap.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { selectSourceStation } from "../../redux/actions/SourceStationActions";
import { selectDestionationStation } from "../../redux/actions/DestinationStationActions";

const Navbar = () => {
  const { data, setData } = useFetch();
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, logout } =
    useAuth();

  // const [stations, setStations] = useState({ input1: "", input2: "" });

  const [isDropDownVisible, setIsDropDownVisible] = useState({
    input1: false,
    input2: false,
  });

  // const source = station.input1;
  // const destination = station.input2;

  const dispatch = useDispatch();

  const sourceStationData = useSelector((state) => state.SourceStationReducer);
  const destinationStationData = useSelector(
    (state) => state.DestinationStationReducer
  );

  const [sourceStation, setSourceStation] = useState(
    sourceStationData.source_station
  );
  const [destinationStation, setDestinationStation] = useState(
    destinationStationData.destination_station
  );

  const [selectedItem, setSelectedItem] = useState({
    input1: sourceStationData.source_station,
    input2: destinationStationData.destination_station,
  });

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

    if (inputId === "input1") setSourceStation(text);
    else if (inputId === "input2") setDestinationStation(text);
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
    dispatch(selectSourceStation(selectedItem.input2));
    dispatch(selectDestionationStation(selectedItem.input1));
  };

  const handleModifyBtn = () => {
    dispatch(selectSourceStation(sourceStation));
    dispatch(selectDestionationStation(destinationStation));
  };

  return (
    <div className="navbar">
      <div className="navbar-elements-div">
        <div className="input1-div">
          <input
            type="text"
            id="input1"
            placeholder="FROM"
            onChange={(e) => handleInputChange(e, "input1")}
            onBlur={() => handleBlur("input1")}
            value={selectedItem.input1}
          />
        </div>
        {isDropDownVisible.input1 && selectedItem.input1 && (
          <List
            stations={data.results}
            handleItemClick={(text) => handleItemClick(text, "input1")}
          />
        )}
        <div className="swap-btn-div">
          <img
            id="swap-img-nav"
            src={swapImage}
            alt="swap-stations"
            onClick={() => swapStations()}
          />
        </div>
        <div className="input2-div">
          <input
            type="text"
            id="input1"
            placeholder="TO"
            onChange={(e) => handleInputChange(e, "input2")}
            onBlur={() => handleBlur("input2")}
            value={selectedItem.input2}
          />
        </div>
        {isDropDownVisible.input2 && selectedItem.input2 && (
          <List
            stations={data.results}
            handleItemClick={(text) => handleItemClick(text, "input2")}
          />
        )}
        <div className="modify-btn-div">
          <Link to="/available-trains">
            <button id="modify-btn" onClick={(e) => handleModifyBtn()}>
              Modify
            </button>
          </Link>
        </div>
        <div className="auth">
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
      </div>
    </div>
  );
};

export default Navbar;
