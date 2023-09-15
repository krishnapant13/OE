import React from "react";
import AdminSidebar from "../../components/Layout/Admin/AdminSidebar.jsx";
import AdminHeader from "../../components/Layout/Admin/AdminHeader.jsx";
import AllUsers from "../../components/Layout/Admin/AllUsers.jsx"

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={4} />
          </div>
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
