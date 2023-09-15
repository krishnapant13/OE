import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import logo from "../../assets/logo/logo.jpeg";
const Footer = () => {
  return (
    <div className="bg-black text-white ">
      <div className="md:flex md:justify-between md:items-center bg-gradient-to-r from-blue-900 via-purple to-black sm:px-12 px-4  py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5 ">
          <span className="text-[#56d879]">Subscribe </span>
          us for get news <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none "
          />
          <button className="bg-gradient-to-r from-teal-500 via-purple to-blue-900 hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full ">
            {" "}
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center ">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col  items-center ">
          <div className="w-[30%]">
            <Link to="/">
              <img className="rounded-full " src={logo} alt="" />
            </Link>
          </div>
          <br />
          <p>The and elements needed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter size={25} className="ml-3 cursor-pointer" />
            <AiFillInstagram size={25} className="ml-3 cursor-pointer" />
            <AiFillYoutube size={25} className="ml-3 cursor-pointer" />
          </div>
        </ul>
        <ul className=" text-center sm:text-start ">
          <h1 className="mb-1 font-semibold "> Company</h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>{" "}
        <ul className=" text-center sm:text-start ">
          <h1 className="mb-1 font-semibold "> Our Shop</h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>{" "}
        <ul className=" text-center sm:text-start ">
          <h1 className="mb-1 font-semibold "> Support</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8 ">
        <span> &copy; 2023 The OE Store, All rights reserved </span>
        <span> Terms Privacy Policy </span>

        <div className="sm:block flex items-center justify-center w-full ">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
