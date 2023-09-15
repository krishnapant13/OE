import React from 'react'
import AllProducts from "../components/Layout/Admin/AllProducts.jsx";
import AdminHeader from '../../components/Layout/Admin/AdminHeader';
import AdminSidebar from '../../components/Layout/Admin/AdminSidebar';

const AdminDashboardProducts = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={5} />
        </div>
        <AllProducts />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardProducts