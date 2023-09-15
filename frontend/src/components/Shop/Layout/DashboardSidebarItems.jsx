import React from "react";
import { Link } from "react-router-dom";

const DashboardSidebarItems = ({ to, icon: Icon, text, active }) => {
  return (
    <div className="w-full flex items-center p-3">
      <Link to={to} className="w-full flex items-center">
        <Icon size={25} color={`${active ? "crimson" : "#555"}`} />
        <h5
          className={`800px:block hidden pl-2 text-[18px] font-[400] ${
            active ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          {text}
        </h5>
      </Link>
    </div>
  );
};

export default DashboardSidebarItems;
