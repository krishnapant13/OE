import React from "react";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { BsCurrencyRupee, BsShop } from "react-icons/bs";
import { HiOutlineUserGroup, HiTemplate } from "react-icons/hi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbReceiptRefund } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import DashboardSidebarItems from "../../Shop/Layout/DashboardSidebarItems";

const sidebarItems = [
  {
    to: "/admin-dashboard",
    icon: RxDashboard,
    text: "Dashboard",
  },
  {
    to: "/admin-orders",
    icon: FiShoppingBag,
    text: "All Orders",
  },
  {
    to: "/admin-sellers",
    icon: BsShop,
    text: "All Sellers",
  },
  {
    to: "/admin-users",
    icon: HiOutlineUserGroup,
    text: "All Users",
  },
  {
    to: "/admin-products",
    icon: HiTemplate,
    text: "All Products",
  },
  {
    to: "/admin-events",
    icon: MdOutlineLocalOffer,
    text: "All Events",
  },
  {
    to: "/admin-withdraw-request",
    icon: BsCurrencyRupee,
    text: "Withdraw Requests",
  },
  {
    to: "/settings",
    icon: CiSettings,
    text: "Settings",
  },
];

const AdminSidebar = ({ active }) => {
  return (
    <div className="w-full h-[89.5vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {sidebarItems.map((item, index) => (
        <DashboardSidebarItems
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

export default AdminSidebar;
