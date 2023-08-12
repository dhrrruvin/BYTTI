import React from "react";
import "./PaymentSuccessful.css";
import { useSearchParams } from "react-router-dom";

const PaymentSucessful = () => {
  const searchQuery = useSearchParams()[0];

  const referenceNumber = searchQuery.get("reference");

  return (
    <>
      <div className="payment-status-container">
        <div className="paymentSuccess">
          <h1>Payment Successfull</h1>
          <h2>Reference No: {referenceNumber}</h2>
        </div>
      </div>
      <div className="button-div">
        <button className="golden-btn" id="home-payment-success-btn">
          Home
        </button>
        <button className="golden-btn" id="download-ticket-payment-success-btn">
          Download Ticket
        </button>
      </div>
    </>
  );
};

export default PaymentSucessful;
