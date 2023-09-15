import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();
  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, [data, allProducts]);
  return (
    <div>
      {data && (
        <div className={`${styles.section} p-4`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5 text-white`}
          >
            Related Products
          </h2>
          <div className=" grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 ">
            {productData &&
              productData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;
