import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [updateButtonVisibility, setUpdateButtonVisibility] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);
  const navigate = useNavigate();

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order Status updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order refund success!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleSelectChange = (e) => {
    setStatus(e.target.value);
    setUpdateButtonVisibility(false);
    console.log("yes");
  };
  return (
    <div className={` py-4  min-h-screen ${styles.section} `}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <HiShoppingBag size={30} color="crimson" />
          <h1 className="pl-2 text-[18px] text-white">Order Details </h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} bg-gradient-to-r  from-teal-500 via-purple to-blue-900  !rounded-[4px] text-white font-[600] h-[4px] text-[18px]`}
          >
            Order List{" "}
          </div>
        </Link>
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
          </div>
        ))}
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
        </div>
      </div>
      <br />
      <br />
      <h4 className="text-[20px] font-[600] ">Order Status: </h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => handleSelectChange(e)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px] text-black"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Processing refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => handleSelectChange(e)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px] text-black"
        >
          {["Processing refund", "Refund Success"]
            .slice(
              ["Processing refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}
      <Button disabled={updateButtonVisibility}>
        <div
          className={`${styles.button} ${
            updateButtonVisibility
              ? "bg-gray-600 "
              : "bg-gradient-to-r  from-teal-500 via-purple to-blue-900 "
          }  !rounded-[4px] text-white font-[600] h-[4px] text-[18px]`}
          onClick={
            data?.status !== "Processing refund"
              ? orderUpdateHandler
              : refundOrderUpdateHandler
          }
        >
          Update Status{" "}
        </div>
      </Button>
    </div>
  );
};

export default OrderDetails;
