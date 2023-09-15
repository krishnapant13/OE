import React from "react";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeatureProducts = () => {
  const { allProducts } = useSelector((state) => state.products);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
  };
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          {allProducts && allProducts.length !== 0 && (
            <h1 className="text-white">Featured Products</h1>
          )}
        </div>{" "}
        <div className="800px:grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0   hidden ">
          {allProducts &&
            allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        <Slider {...settings}>
          {allProducts &&
            allProducts.map((product, index) => (
              <div key={index} className="p-1">
                <div
                  className={`w-full block 800px:hidden mb-6 ${
                    index === 2 ? "md:w-1/5" : "md:w-full"
                  }`}
                >
                  <ProductCard data={product} />
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeatureProducts;
