import React, { useState } from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
import Drowpdown from "./Drowpdown";

import { categoriesData } from "../../static/data";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className={`block 800px:${styles.normalFlex} `}>
      {" "}
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#191330]"
                  : "text-block 800px:text-[#fff]"
              } pb-[20px] 800px:pb-0 font-[500] px-6 cursor-pointer `}
            >
              {i.title}
            </Link>
          </div>
        ))}{" "}
      <div onClick={() => setDropDown(!dropDown)}>
        <div className=" relative h-[60px] mt-[10px] w-auto hidden 1000px:block">
          {/* <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 text-white"
              /> */}
          <button
            className={`h-[80%] w-full flex justify-between items-center pl-10    text-white  font-sans text-lg font-[500] select-none rounded-t-md`}
          >
            {/* bg-gradient-to-r from-blue-900 via-purple to-black */}
            Categories
          </button>
          <IoIosArrowDown
            size={20}
            color="white"
            className="absolute left-[132px] top-4 cursor-pointer"
            onClick={() => setDropDown(!dropDown)}
          />
          {dropDown ? (
            <Drowpdown
              categoriesData={categoriesData}
              setDropDown={setDropDown}
            />
          ) : null}
        </div>
      </div>{" "}
      {user && user.role === "Admin" && (
        <div
          className={`${styles.adminButton} ml-[100px] p-1  text-[12px] !rounded-[4px]`}
        >
          <Link to="/admin-dashboard">
            <h1 className="text-[#fff] flex items-center">
              Admin Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      )}
      {user && user?.email === "krishnapant1303@gmail.com" && (
        <div
          className={`${styles.adminButton} ml-[100px] p-1  text-[12px] !rounded-[4px]  bg-gradient-to-r
          from-blue-900
          via-purple
          to-black`}
        >
          <Link to="/dashboard">
            <h1 className="text-[#fff] flex items-center">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
