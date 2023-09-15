import React from "react";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopSellerAllRefunds from "./ShopSellerAllRefunds.jsx";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <ShopSellerAllRefunds />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
