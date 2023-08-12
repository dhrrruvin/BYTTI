import React from "react";
import "./FareDetails.css";

const FareDetails = ({ count, sendFare }) => {
  return (
    <div className="fare-details-main-div">
      <div className="fare-details-header-div">
        <h3>Fare Summary</h3>
      </div>
      <div className="ticket-fare-div">
        <div className="ticket-subject-div">Ticket Fare</div>
        <div className="ticket-price-div">{count} x 4100</div>
      </div>
      <div className="total-ticket-fare-div">
        <div className="total-ticket-subject-div">Total Fare</div>
        <div
          className="total-ticket-price-div"
          onChange={() => sendFare(count * 4100)}
        >
          {count * 4100}
        </div>
      </div>
    </div>
  );
};

export default FareDetails;
