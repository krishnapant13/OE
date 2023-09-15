import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import { getAllProductsShop } from "../../../redux/actions/product";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdListAlt } from "react-icons/md";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [delivered, setDelivered] = useState(null);
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDelivered(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax = delivered
    ? delivered.reduce((acc, item) => acc + item.totalPrice, 0)
    : 0;

  // const serviceCharge = totalEarningWithoutTax * 0.1 || 0 ;
  const availableBalance =
    totalEarningWithoutTax /* - serviceCharge.toFixed(2)  */ || 0;

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Items",
      minWidth: 180,
      flex: 1.4,
      renderCell: (params) => {
        const cartItems = params.row.cart.map((item) => item.name);

        if (cartItems.length === 1) {
          return <div>{cartItems[0]}</div>;
        }
        return (
          <div>
            <select
              disabled={!cartItems.length}
              className=" w-[150px] py-3 bg-[#fff0]"
            >
              <option value="" disabled selected>
                See Cart Items
              </option>
              {cartItems.map((itemName, index) => (
                <option
                  className="bg-[#00000093] text-white"
                  key={index}
                  disabled
                  value={itemName}
                >
                  {itemName}
                </option>
              ))}
            </select>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "",
      headerName: "Check Details",
      type: "number",
      minWidth: 150,
      flex: 1.0,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        cart: item.cart,
        itemsQty: item.cart.length,
        total: "\u20B9" + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="w-full px-8">
      <h3 className="text-[22px] font-Poppins text-white pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 mr-3  800px:w-[31%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BiRupee size={30} fill="#000" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              {/* <span className="text-[16px]">(with 10% Service Charge)</span> */}
            </h3>
          </div>
          <h5 className="pt-2  pl-1 text-[18px] font-[500]">
            ₹ {availableBalance}
          </h5>
          <Link to={"/dashboard-withdraw-money"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        <div className="w-full mb-4 mr-3  800px:w-[31%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BsFillHandbagFill size={30} fill="#000" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 pl-2 font-[400] text-[#00000085]`}
            >
              All Orders{" "}
            </h3>
          </div>
          <h5 className="pt-2  pl-1 text-[18px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to={"/dashboard-orders"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4  800px:w-[31%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdListAlt size={30} fill="#000" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              All Products{" "}
            </h3>
          </div>
          <h5 className="pt-2  pl-1 text-[18px] font-[500]">
            {products && products.length}
          </h5>
          <Link to={"/dashboard-products"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
        <br />
      </div>{" "}
      <h3 className="text-[22px] font-Poppins pb-2 text-white">
        {" "}
        Latest Orders
      </h3>
      <div className="w-full bg-white rounded h-[51vh] overflow-y-scroll ">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={3}
          pagination
          autoHeight
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DashboardHero;
