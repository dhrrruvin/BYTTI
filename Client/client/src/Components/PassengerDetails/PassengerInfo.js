import React, { useEffect, useState } from "react";
import "./PassengerInfo.css";
import PassengerInput from "./PassengerInput";
import { v4 as uuidv4 } from "uuid";

const PassengerInfo = ({ countPassengers }) => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    setPassengers([
      {
        id: Date.now(),
        passengerData: {
          name: "",
          age: "",
          gender: "",
          country: "",
          preference: "",
        },
      },
    ]);
  }, []);

  useEffect(() => {
    countPassengers(passengers.length);
  }, [passengers.length]);

  const addPassengers = (e) => {
    e.preventDefault();

    setPassengers((prevPassengers) => {
      const newPassenger = {
        id: Date.now(),
        passengerData: {
          name: "",
          age: "",
          gender: "",
          country: "",
          preference: "",
        },
      };

      return [...prevPassengers, newPassenger];
    });
  };

  const handleInputChange = (passengerId, inputField, newData) => {
    console.log(passengerId);
    console.log(inputField);
    console.log(newData);
    setPassengers((prevPassengers) => {
      // prevPassengers[index] = data;
      // return prevPassengers;

      const a = prevPassengers.map((item) =>
        item.id === passengerId
          ? {
              ...item,
              passengerData: { ...item.passengerData, [inputField]: newData },
            }
          : item
      );
      return a;
    });
  };

  const removePassenger = (passengerId) => {
    if (passengers.length === 1) return;

    setPassengers((prevState) =>
      prevState.filter((element) => element.id !== passengerId)
    );
  };

  const renderPassengerList = () => (
    <>
      {console.log(passengers)}
      {passengers?.map((element) => (
        <PassengerInput
          data={element}
          onInputChange={handleInputChange}
          key={element.id}
          onRemove={removePassenger}
        />
      ))}
    </>
  );

  return (
    <div className="passenger-info-div">
      <span className="passenger-info-header">Passenger Details</span>
      {renderPassengerList()}
      <div className="add-passenger-btn-div">
        <span className="add-passenger" onClick={(e) => addPassengers(e)}>
          + Add Passenger
        </span>
      </div>
    </div>
  );
};

export default PassengerInfo;
