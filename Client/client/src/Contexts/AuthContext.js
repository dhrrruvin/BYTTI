import React, { useState, useContext, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post("/auth/validate-user", {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        login(response);
      }
    };
    fetch();
  }, []);

  const login = (response) => {
    setIsLoggedIn(true);
    setAuthUser(response.data.name);
  };

  const logout = async (e) => {
    e.preventDefault();
    const response = await axios.get("/auth/logout", { withCredentials: true });
    console.log(response);
    setAuthUser("");
    setIsLoggedIn(false);
  };

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
