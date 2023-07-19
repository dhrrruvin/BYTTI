import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const Signup = () => {
  const [responseData, setResponseData] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", formData);
      console.log(response.data);
      setResponseData(response.data);
    } catch (error) {
      console.log("error posting data in signup.js");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDataForm) => ({
      ...prevDataForm,
      [name]: value,
    }));
  };

  return (
    <div className="signup-container">
      <section>
        <div className="signup-form-box">
          <p id="errorMsg">{responseData}</p>
          <div className="form-value">
            <form action="/register" method="post">
              <h2 id="signup-text">Sign Up</h2>
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  required
                  autoComplete="off"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="">Name</label>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label htmlFor="">Password</label>
              </div>
              <button id="submit-register" onClick={handleSignup}>
                Sign Up
              </button>
              <div className="login">
                <p>
                  Alredy have an account? <Link to="/login">Log In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
