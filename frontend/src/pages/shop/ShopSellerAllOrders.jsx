import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const ShopSellerAllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, []);
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
      flex: 1,
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
    <div className="pl-8 pr-8 pt-2 w-full">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default ShopSellerAllOrders;
