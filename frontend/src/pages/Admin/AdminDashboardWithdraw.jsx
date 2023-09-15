import React from 'react'
import AllWithdraw from "../components/Layout/Admin/AllWithdraw.jsx";
import AdminHeader from '../../components/Layout/Admin/AdminHeader';
import AdminSidebar from '../../components/Layout/Admin/AdminSidebar';

const AdminDashboardWithdraw = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={7} />
        </div>
         <AllWithdraw />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardWithdraw