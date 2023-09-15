import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/success.json";
import animationDataPopper from "../../assets/animations/popper.json";

const SuccessAnimation = () => {
  const [showFirstLottie, setShowFirstLottie] = useState(false);
  useEffect(() => {
    const delay = 500; // Half a second delay (in milliseconds)
    const timer = setTimeout(() => {
      setShowFirstLottie(true);
    }, delay);

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const popperAnimationOptionsLeft = {
    loop: false,
    autoplay: true,
    animationData: animationDataPopper,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        {showFirstLottie && (
          <Lottie options={defaultOptions} width={400} height={400} />
        )}
      </div>
      <div
        className="fixed bottom-0 left-0"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          padding: "10px",
        }}
      >
        <Lottie options={popperAnimationOptionsLeft} width={400} height={400} />
      </div>{" "}
      <div
        className="fixed bottom-0 right-0"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          padding: "10px",
        }}
      >
        <Lottie options={popperAnimationOptionsLeft} width={400} height={400} />
      </div>
    </div>
  );
};

export default SuccessAnimation;
