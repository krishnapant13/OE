import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/data_fetch_loader.json";

const DataFetchLoader = ({ animation }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation ? animation : animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    speed: 2.5,
  };
  return (
    <div
      className={`w-full ${
        animation ? "h-[70vh]" : "h-screen"
      } flex items-center justify-center`}
    >
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default DataFetchLoader;
