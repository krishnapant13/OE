import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/loader.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
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

export default Loader;
