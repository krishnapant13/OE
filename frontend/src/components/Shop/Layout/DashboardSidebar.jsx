import React from "react";
import DashboardSidebarItem from "./DashboardSidebarItems.jsx";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { BsCurrencyRupee } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbReceiptRefund } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";

const sidebarItems = [
  {
    to: "/dashboard",
    icon: RxDashboard,
    text: "Dashboard",
  },
  {
    to: "/dashboard-orders",
    icon: FiShoppingBag,
    text: "All Orders",
  },
  {
    to: "/dashboard-products",
    icon: FiShoppingBag,
    text: "All Products",
  },
  {
    to: "/dashboard-create-product",
    icon: AiOutlineFolderAdd,
    text: "Create Product",
  },
  {
    to: "/dashboard-events",
    icon: MdOutlineLocalOffer,
    text: "All Events",
  },
  {
    to: "/dashboard-create-event",
    icon: VscNewFile,
    text: "Create Event",
  },
  {
    to: "/dashboard-withdraw-money",
    icon: BsCurrencyRupee,
    text: "Withdraw Money",
  },
  {
    to: "/dashboard-messages",
    icon: BiMessageSquareDetail,
    text: "Shop Inbox",
  },
  {
    to: "/dashboard-coupons",
    icon: AiOutlineGift,
    text: "Discount Codes",
  },
  {
    to: "/dashboard-refunds",
    icon: TbReceiptRefund,
    text: "Refunds",
  },
  {
    to: "/settings",
    icon: CiSettings,
    text: "Settings",
  },
];

const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full h-[89.5vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {sidebarItems.map((item, index) => (
        <DashboardSidebarItem
          key={index}
          to={item.to}
          icon={item.icon}
          text={item.text}
          active={active === index + 1}
        />
      ))}
    </div>
  );
};

export default DashboardSidebar;
