import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
