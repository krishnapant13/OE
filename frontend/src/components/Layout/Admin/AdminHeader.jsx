import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo/logo.jpeg";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  const [welcomeText, setWelcomeText] = useState(true);
  setTimeout(() => {
    setWelcomeText(false);
  }, 5000);
  return (
    <div className="w-full h-[80px] bg-gradient-to-b from-gray-900 to-black shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 ">
      <div className="w-[5.5%] m-2">
        <Link to="/">
          <img className="rounded-full " src={logo} alt=""></img>
        </Link>
      </div>
      {welcomeText && (
        <h3
          className={`font-[500] text-[30px] text-white font-Poppins text-left `}
        >
          Welcome to {user?.name}
        </h3>
      )}
      <div className="flex items-center ">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/coupons" className="800px:block hidden">
            <AiOutlineGift
              color="#fff"
              size={30}
              className="mx-3 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#fff"
              size={30}
              className="mx-3 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#fff"
              size={30}
              className="mx-3 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#fff" size={30} className="mx-3 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#fff"
              size={30}
              className="mx-3 cursor-pointer"
            />
          </Link>
            <img
              src={`${backend_url}${user?.avatar}`}
              alt=""
              className="m-2 w-[40px] h-[40px] rounded-full object-cover "
            />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
