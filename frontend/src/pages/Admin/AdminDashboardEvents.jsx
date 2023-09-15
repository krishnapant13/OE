import React from 'react'
import AllEvents from '../components/Layout/Admin/AllEvents.jsx';
import AdminHeader from '../../components/Layout/Admin/AdminHeader';
import AdminSidebar from '../../components/Layout/Admin/AdminSidebar';

const AdminDashboardEvents = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={6} />
        </div>
        <AllEvents />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardEvents