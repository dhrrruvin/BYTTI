import React from "react";
import Navbar from "./Navbar";
import JourneyDetail from "./JourneyDetail";
import "./PassengerDetails.css";
import FareDetails from "./FareDetails";
import PassengerInfo from "./PassengerInfo";
import { useState } from "react";
import ContactDetails from "./ContactDetails";
import axios from "../../api/axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PassengerDetails = () => {
  const [count, setCount] = useState(1);
  const [fare, setFare] = useState(4100);

  const trainData = useSelector((state) => state.TrainDataReducer);
  console.log(trainData);

  const countPassengers = (passengerCount) => {
    setCount(passengerCount);
  };

  const sendFare = (newFare) => {
    setFare(newFare);
  };

  const checkoutHandler = async () => {
    console.log(window);
    let key, order, user;

    try {
      const resp = await axios.get("/auth/getData");
      if (resp.status === 200) user = resp.data;
    } catch (error) {
      console.log("error getting user information");
      console.log(error);
    }

    try {
      const resp = await axios.post("/checkout", { amount: fare });
      if (resp.status === 200) {
        order = resp.data.order;
      }
    } catch (error) {
      console.log("error posting checkout data");
      console.log(error);
    }

    try {
      const resp = await axios.get("/getKey");
      if (resp.status === 200) {
        key = resp.data.key;
      }
    } catch (error) {
      console.log("error getting payment key id ");
      console.log(error);
    }

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      one_click_checkout: true,
      name: "Dhruvin Kanani", //your business name
      order_id: order.id,
      show_coupons: true, // default true; false if coupon widget should be hidden
      callback_url: "http://localhost:6969/paymentVerification",
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="main-passenger-details-div">
      <Navbar />
      <div className="journey-parent-div">
        <JourneyDetail />
        <PassengerInfo countPassengers={countPassengers} />
        <ContactDetails />
      </div>
      <FareDetails count={count} sendFare={sendFare} />
      <div className="pay-btn-div">
        <button className="pay-btn" onClick={() => checkoutHandler()}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PassengerDetails;
