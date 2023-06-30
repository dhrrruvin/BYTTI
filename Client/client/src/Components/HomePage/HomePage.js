import React, { useState } from "react";
import "./HomePage.css";
import destinationImage from "./destination-icon.gif";
import locationImage from "./location.gif";
import swapImage from "./swap.svg";
import useFetch from "../../hooks/useFetch";
import List from "./List/List";

const HomePage = () => {
  const { data, setData } = useFetch();
  // const [isComponentVisible, setComponentVisible] = useState(false);
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

  // const handleClickOutside = (e) => {
  //   if (
  //     dropdownRef1.current &&
  //     !dropdownRef1.current.contains(e.target) &&
  //     dropdownRef2.current &&
  //     !dropdownRef2.current.contains(e.target)
  //   ) {
  //     setIsDropDownVisible({});
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // });

  const handleInputChange = (e, inputId) => {
    setData({ ...data, slug: e.target.value });
    handleFocus(inputId);
    setSelectedItem((prevSelectedItems) => ({
      ...prevSelectedItems,
      [inputId]: e.target.value,
    }));
  };

  return (
    <>
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
          {isDropDownVisible["input1"] && (
            <List
              stations={data.results}
              handleItemClick={(text) => handleItemClick(text, "input1")}
            />
          )}
        </div>
        <div className="swap-btn-div">
          <img id="swap-img" src={swapImage} alt="swap-stations" />
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
          {isDropDownVisible["input2"] && (
            <List
              stations={data.results}
              handleItemClick={(text) => handleItemClick(text, "input2")}
            />
          )}
        </div>
        <div className="search-btn-div">
          <button id="search-btn" type="submit">
            search
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
