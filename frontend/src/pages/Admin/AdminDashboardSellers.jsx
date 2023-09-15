import React from 'react'
import AllSellers from "../../components/Layout/Admin/AllSellers.jsx";
import AdminSidebar from '../../components/Layout/Admin/AdminSidebar';
import AdminHeader from '../../components/Layout/Admin/AdminHeader';

const AdminDashboardSellers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardSellers