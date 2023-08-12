import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import PaymentSucessful from "../Components/PaymentStatus/PaymentSucessful";
import PaymentRejected from "../Components/PaymentStatus/PaymentRejected";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  const searchQuery = useSearchParams()[0];
  console.log(searchQuery.get("reference"));

  return isLoggedIn ? (
    true ? (
      <PaymentSucessful />
    ) : (
      <PaymentRejected />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
