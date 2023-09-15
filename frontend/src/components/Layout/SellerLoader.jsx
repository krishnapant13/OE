import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/seller_loader.json";

const SellerLoader = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    speed: 2,
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default SellerLoader;
