import React from "react";
import Header from "../components/Layout/Header";
import TrackUserOrder from "../components/Profile/TrackUserOrder.jsx";
import Footer from "../components/Layout/Footer";

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <TrackUserOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
