import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  const reviewHandeler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOpen(false);
        setComment("");
        setRating(1);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const refundHandeler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className={` py-4  min-h-screen ${styles.section} text-white`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <HiShoppingBag size={30} color="crimson" />
          <h1 className="pl-2 text-[18px] text-white">Order Details </h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5>
          Order ID : <span>{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5>
          Placed On : <span>{data?.createdAt?.slice(0, 10)}</span>{" "}
        </h5>
      </div>
      {/* order items */}
      {data &&
        data.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5 mt-4">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px]">
                ₹ {item.discountPrice} * {item.qty}
              </h5>
            </div>
            {data?.status !== "Delivered" && !item.isReviewed && (
              <div
                className={`${styles.button} bg-gradient-to-r  from-teal-500 via-purple to-blue-900  !rounded-[4px] text-white font-[600] h-[4px]`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div>
            )}
          </div>
        ))}
      {/* review modal */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#000000d3] z-11 flex items-center justify-center">
          <div className="w-[50%] h-min bg-white text-black shadow rounded-md pt-3 ">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                color="black"
                size={25}
                onClick={() => setOpen(false)}
                className=" cursor-pointer"
              />
            </div>
            <h4 className="text-[30px] font-[500]  font-Poppins text-center ">
              Give a review
            </h4>
            <div className="w-full flex items-center">
              <img
                src={`${backend_url}/${selectedItem.images[0]}`}
                alt=""
                className="w-[100px] h-[100px] "
              />{" "}
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-2 text-[15px]">
                  ₹ {selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>
            <br />
            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-500">
              Give a rating <span className="text-red-500 ">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[18px] font-[500] ">
                Write a comment{" "}
                <span className="text-[15px] font-[400]  text-[#0000008f] ml-1 ">
                  {"(Optional)"}
                </span>
              </label>
              <textarea
                name=""
                placeholder="How was your ordered item? write your expression about it."
                className="mt-2 w-[95%] border p-2 outline-none"
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>{" "}
            <div
              className={`${styles.button} bg-gradient-to-r  from-teal-500 via-purple to-blue-900  !rounded-[4px] text-white font-[600] h-[4px] ml-3`}
              onClick={reviewHandeler}
            >
              Submit{" "}
            </div>
          </div>
        </div>
      )}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>₹ {data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center ">
        <div className="w-full  800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]"> Shipping Address</h4>
          <h4 className="pt-3 text-[20px] font-[600]">
            {" "}
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>{" "}
          <h4 className="text-[20px] font-[600]">
            {data?.shippingAddress.country}
          </h4>{" "}
          <h4 className="text-[20px] font-[600]">
            {data?.shippingAddress.city}
          </h4>{" "}
          <h4 className="text-[20px] font-[600]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%] ">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4 className="pt-3 text-[20px]">
            Status :{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          {data?.status === "Delivered" && (
            <div
              className={`${styles.button} bg-gradient-to-r  from-teal-500 via-purple to-blue-900  !rounded-[4px] text-white font-[600] h-[4px] text-[18px]`}
              onClick={refundHandeler}
            >
              Refund{" "}
            </div>
          )}
        </div>
      </div>
      <Link to={"/"}>
        <div
          className={`${styles.button} bg-gradient-to-r  from-teal-500 via-purple to-blue-900  !rounded-[4px] text-white font-[600] h-[4px] text-[18px]`}
        >
          Send Message{" "}
        </div>
      </Link>

      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
