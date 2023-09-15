import React from "react";
import Header from "../components/Layout/Header";
import UserOrderDetails from "../components/UserOrderDetails/UserOrderDetails.jsx";
import Footer from "../components/Layout/Footer";

const OrderDetailsPage = () => {
  return (
    <div className=" bg-gradient-to-t from-slate-200 via-slate-600 to-zinc-700 ">
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
