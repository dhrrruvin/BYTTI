import React, { useState } from "react";
import "./PassengerInput.css";
import closeIcon from "../../Resources/close.png";

const PassengerInput = ({ data, onInputChange, onRemove }) => {
  const [passengerData, setPassengerData] = useState({
    ...data,
  });

  // console.log(passengerData);

  const handleRemove = () => {
    onRemove(data.id);
  };

  const handleInputChange = (e, input) => {
    onInputChange(data.id, input, e.target.value);
  };

  return (
    <div className="passenger-input-div">
      <input
        type="text"
        placeholder="Passenger Name"
        id="passenger-name"
        className="passenger-input"
        required
        onChange={(e) => handleInputChange(e, "name")}
      />
      <input
        type="number"
        placeholder="Age"
        id="passenger-age"
        onChange={(e) => handleInputChange(e, "age")}
        required
        className="passenger-input"
      />
      <select
        id="passenger-gender"
        className="passenger-input"
        required
        defaultValue={"Gender"}
        onChange={(e) => handleInputChange(e, "gender")}
      >
        <option value="" disabled>
          Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
      </select>
      <select
        id="passenger-country"
        required
        className="passenger-input"
        defaultValue={"India"}
        onChange={(e) => handleInputChange(e, "country")}
      >
        <option value="India">India</option>
        <option value="India">India</option>
        <option value="India">India</option>
      </select>
      <select
        id="passenger-seat-preference"
        className="passenger-input"
        defaultValue={"No Preference"}
        onChange={(e) => handleInputChange(e, "preference")}
      >
        <option value="No Preference">No Preference</option>
        <option value="Lower">Lower</option>
        <option value="Upper">Upper</option>
        <option value="Side Lower">Side Lower</option>
        <option value="Side Upper">Side Upper</option>
      </select>
      <div className="cross-btn-div">
        <img
          src={closeIcon}
          alt="cross-btn"
          id="close-btn"
          className="close-btn"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default PassengerInput;
