import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSelling = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  useEffect(() => {
    const d =
      allProducts && [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
    setData(d);
  }, [allProducts]);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}></div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px]  lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]  px-12 mb-12 ">
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>{" "}
    </div>
  );
};

export default BestSelling;
