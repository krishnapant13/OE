import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductsDetails from "../components/Products/ProductsDetails";
import SuggestedProduct from "../components/SuggestedProduct/SuggestedProduct.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductsDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <ProductsDetails data={data} />
      {!eventData && data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductsDetailsPage;
