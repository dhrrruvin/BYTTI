import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import List from "../HomePage/List/List";
import "./Navbar.css";
import swapImage from "../HomePage/swap.svg";
import { Link } from "react-router-dom";

const Navbar = ({ station }) => {
  const { data, setData } = useFetch();

  const [isDropDownVisible, setIsDropDownVisible] = useState({
    input1: false,
    input2: false,
  });

  const source = station.input1;
  const destination = station.input2;

  const [selectedItem, setSelectedItem] = useState({
    input1: source,
    input2: destination,
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
            id="swap-img"
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
          <Link to="/available-trains" state={{ data: selectedItem }}>
            <button id="modify-btn" type="submit">
              Modify
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
