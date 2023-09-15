import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeats bg-cover ${styles.normalFlex}`}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-center 800px:text-start text-[#ffffff] font-[600] capitalize">
          Best Collection Of <br /> Resin Products
        </h1>
        <p className="pt-5 text-[16px] text-center 800px:text-start font-[Poppins] font-[400] text-[#fff] ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ipsum
          doloremque cupiditate quae? Nulla voluptates deserunt sequi aliquam
          temporibus quas corporis adipisci accusamus, illo, doloribus,
          necessitatibus tempore perspiciatis similique nisi!
        </p>
        <Link
          to="/products"
          className="flex justify-center 800px:justify-start items-center"
        >
          <div
            className={`${styles.button} mt-5 bg-gradient-to-r from-blue-900 via-purple to-black !rounded-[4px]`}
          >
            <span className="text-[#fff] font-[Poppins] text-[18px] ">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
