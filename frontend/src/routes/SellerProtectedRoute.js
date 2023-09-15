import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SellerLoader from "../components/Layout/SellerLoader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  if (isLoading === true) {
    return <SellerLoader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/shop-login`} />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
