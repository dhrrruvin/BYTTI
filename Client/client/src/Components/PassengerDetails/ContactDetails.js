import React from "react";
import "./ContactDetails.css";

const ContactDetails = () => {
  return (
    <div className="contact-info-div">
      <span className="contact-info-header">Contact Details</span>
      <div className="ticket-notice">
        <span>(Ticket will be sent to email- and regitered mobile number)</span>
      </div>
      <div className="contact-input-div">
        <div className="mobile-country-code">
          <span>+91</span>
        </div>
        <input
          type="number"
          required
          id="passenger-number"
          className="passenger-input"
        />
      </div>
    </div>
  );
};

export default ContactDetails;
