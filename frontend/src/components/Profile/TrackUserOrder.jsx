import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import packing from "../../assets/animations/packing.json";
import toDelivery from "../../assets/animations/toDelivery.json";
import shipped from "../../assets/animations/shipped.json";
import DataFetchLoader from "../Layout/DataFetchLoader";
const TrackUserOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  return (
    <div>
      <>
        {data && data.status === "Processing" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              <DataFetchLoader animation={packing} />
              Your order is in process now!
            </h1>
          </div>
        ) : data.status === "Transferred to delivery partner" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              <DataFetchLoader animation={toDelivery} />
              Your order is transferred to delivery partner.
            </h1>
          </div>
        ) : data.status === "Shipping" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              <DataFetchLoader animation={shipped} />
              Your order is shipped.
            </h1>
          </div>
        ) : data.status === "Received" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              Your order is collected by the delivery agent.
            </h1>
          </div>
        ) : data.status === "On the way" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              Order is on the way.
            </h1>
          </div>
        ) : data.status === "Delivered" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              Order Delivered.
            </h1>
          </div>
        ) : data.status === "Processing Refund" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              Your Refund is under process
            </h1>
          </div>
        ) : data.status === "Refund Success" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-center text-[20px] text-white">
              {" "}
              Successfully Refund
            </h1>
          </div>
        ) : null}
      </>
    </div>
  );
};

export default TrackUserOrder;
