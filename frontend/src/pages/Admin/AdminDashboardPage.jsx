import React from "react";
import AdminHeader from "../../components/Layout/Admin/AdminHeader.jsx";
import AdminSidebar from "../../components/Layout/Admin/AdminSidebar.jsx";
import AdminHero from "../../components/Layout/Admin/AdminHero.jsx";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[60px] 800px:w-[330px]">
          <AdminSidebar active={1} />
        </div>
        <AdminHero />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
