import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSideBar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const handleSetActive = (index) => {
    setActive(index);
  };

  return (
    <div className="w-full">
      <Header />
      <div className={` h-[90vh] flex bg-[#f5f5f5] m-2`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[50%] ">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} setActive={handleSetActive} />
      </div>
    </div>
  );
};

export default ProfilePage;
