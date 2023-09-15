import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/Layout/Admin/AdminHeader";
import AdminSidebar from "../../components/Layout/Admin/AdminSidebar";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
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
      headerName: "Cart Items",
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
      headerName: "Check details",
      type: "number",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
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
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        cart: item.cart,
        itemsQty: item.cart.length,
        total: "\u20B9" + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
