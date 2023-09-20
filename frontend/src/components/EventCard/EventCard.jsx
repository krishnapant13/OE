import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import CountDown from "../CountDown/CoutDown.jsx";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const [itemExists, setItemExists] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart && cart.find((i) => i?._id === data?._id)) {
      setItemExists(true);
    } else {
      setItemExists(false);
    }
  }, [cart]);
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      setItemExists(true);
      toast.error("Item already in cart!");
    } else {
      setItemExists(false);
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div
      className={`w-full  block bg-white h-auto ${
        active ? "unset" : "mb-12"
      } lg:flex 800px:p-2`}
    >
      {data && (
        <div className="w-full lg:w-[50%] m-auto p-2">
          <img src={`${backend_url}${data.images[0]}`} alt="" />
        </div>
      )}
      {data ? (
        <div className="w-full lg:[w-50%] flex flex-col justify-center p-5">
          <h2 className={`${styles.productTitle} `}>{data.name}</h2>
          <p>{data.description}</p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
                ₹{data.discountPrice}
              </h5>{" "}
              <h5 className="font-[500] text-[15px] text-[#d55b45] pl-2 line-through ">
                ₹{data.originalPrice}
              </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e] ">
              {data?.sold_out} sold
            </span>
          </div>
          <CountDown data={data} />
          <br />
          <div className="flex items-center ">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <div
                className={`${styles.button} !rounded-[4px] bg-gradient-to-r
            from-blue-900
            via-purple
            to-black text-[#fff]`}
              >
                See Details
              </div>
            </Link>
            <div
              className={`${styles.button} !rounded-[4px] text-[#fff] ml-5  bg-gradient-to-r
              from-blue-900
              via-purple
              to-black`}
              onClick={() => addToCartHandler(data)}
            >
              Add to cart
            </div>
          </div>
        </div>
      ) : (
        <p className="w-full text-center mt-10">
          No Events Running Currently!{" "}
        </p>
      )}
    </div>
  );
};

export default EventCard;
