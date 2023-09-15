import React from "react";
import ProfileSection from "./ProfileSection.jsx";
import AllOrders from "./AllOrders.jsx";
import AllRefundOrders from "./AllRefundOrders.jsx";
import TrackOrder from "./TrackOrder.jsx";
import UpdatePassword from "./UpdatePassword.jsx";
import UserAddress from "./UserAddress.jsx";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full 800px:mt-0 mt-[10%]">
      {/* // profile page */}
      {active === 1 && <ProfileSection />}
      {/* order page */}
      {active === 2 && <AllOrders />}
      {/* refund  */}
      {active === 3 && <AllRefundOrders />}
      {/* Track order  */}
      {active === 5 && <TrackOrder />}
      {/*Payment Methods*/}
      {active === 6 && <UpdatePassword />}
      {/*Address*/}
      {active === 7 && <UserAddress />}
    </div>
  );
};

export default ProfileContent;
