import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import Cart from "../Cart/Cart";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import logo from "../../assets/logo/logo.jpeg";
import logo1 from "../../assets/logo/logo.png";
import NavBar from "./NavBar.jsx";
import { useSelector } from "react-redux";
import WishList from "../WishList/WishList";
import { backend_url } from "../../server";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setSearchTerm("");
  };
  useEffect(() => {
    if (cart && cart.length > 0) {
      setCartUpdated(true);
      setTimeout(() => {
        setCartUpdated(false);
      }, 1000);
    }
  }, [cart]);

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      setWishlistUpdated(true);
      setTimeout(() => {
        setWishlistUpdated(false);
      }, 1000);
    }
  }, [wishlist]);
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        {user && user?.email === "krishnapant1303@gmail.com" && (
          <div className="hidden 800px:h-[50px] pt-5 mb-4 800px:flex justify-end items-center ">
            <div
              className={`${styles.button} !rounded-[4px]  bg-gradient-to-r
            from-blue-900
            via-purple
            to-black`}
            >
              <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                <h1 className="text-[#fff] flex items-center">
                  {isSeller ? " Dashboard" : "Become Seller"}{" "}
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          active === true
            ? "shadow-sm fixed top-0 left-0 z-10 bg-gradient-to-r from-blue-900 via-purple to-black"
            : "bg-slate-400"
        } transition hidden 800px:flex items-center justify-between w-full   h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div className="flex justify-between items-center">
            {" "}
            <div className="w-[60px] h-[60px]">
              <Link to="/">
                <img className="rounded-full " src={logo} alt=""></img>
              </Link>
            </div>
            <div className="relative ml-5 rounded-full ">
              <input
                type="search"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`px-4 py-2 rounded-full focus:outline-none ${
                  isExpanded ? "w-64" : "w-0"
                } transition-all duration-300`}
              />
              <div
                className={`absolute rounded-full inset-y-0 right-[-5px] flex items-center p-2 cursor-pointer ${
                  isExpanded ? "bg-gray-200" : "bg-gray-300"
                } transition-all duration-300`}
                onClick={toggleExpand}
              >
                <AiOutlineSearch
                  className={`h-6 w-6 rounded-full ${
                    isExpanded ? "text-gray-600" : "text-gray-800"
                  }`}
                />
              </div>
              {isExpanded &&
              searchTerm &&
              searchData &&
              searchData.length !== 0 ? (
                <div className="absolute h-auto bg-slate-50 shadow-sm-2 z-[9] p-4 w-[225px] ml-4 ">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-center py-2">
                            <img
                              src={`${backend_url}${i.images[0]}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <NavBar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className={`relative cursor-pointer mr-[15px] ${
                  wishlistUpdated ? "animate-wishlist" : ""
                }`}
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className={`relative cursor-pointer mr-[15px] ${
                  cartUpdated ? "animate-cart" : ""
                }`}
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      className="h-7 w-7 rounded-full object-cover "
                      src={`${backend_url}${user.avatar}`}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <WishList setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft size={40} onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="/">
              <img
                src="http://localhost:3000/static/media/logo.11feb78e9bf4464c112c.jpeg"
                alt=""
                className="mt-3 cursor-pointer w-[40px] h-[40px] rounded-full"
              />
            </Link>
          </div>
          <div>
            <div className="relative" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} className="mr-1" />
              <span className="absolute right-1 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && searchTerm && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="flex items-center">
                            <img
                              src={`${backend_url}${i.images[0]}`}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <NavBar active={activeHeading} />{" "}
              {user && user?.email === "krishnapant1303@gmail.com" && (
                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                  <Link to="/shop-create">
                    <h1 className="text-[#fff] flex items-center">
                      Dashboard <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
              )}
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
