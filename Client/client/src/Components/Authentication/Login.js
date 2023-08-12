import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [responseData, setResponseData] = useState("");
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    try {
      const response = await axios.post("/auth/login", formData, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      setAuthUser(response.data.name);
      navigate(-1);
    } catch (error) {
      setResponseData(error.response.data);
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <section>
        <div className="form-box">
          <p id="errorMsg">{responseData}</p>
          <div className="form-value">
            <div className="form">
              <h2 id="login-text">Log In</h2>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  placeholder=" "
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="">Password</label>
              </div>
              <div className="forget">
                <a href="/#">Forget Password?</a>
              </div>
              <button
                id="submit-login"
                onClick={() => {
                  handleLogin();
                }}
              >
                Log In
              </button>
              <div className="register">
                <p>
                  Don't have an account? <Link to="/signup">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
