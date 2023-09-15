import React from "react";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import WithdrawMoney from "../../components/Shop/WithdrawMoney.jsx";

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[60px] 800px:w-[330px]">
          <DashboardSidebar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
