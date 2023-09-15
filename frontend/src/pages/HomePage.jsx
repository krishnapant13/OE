import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero.jsx";
import Categories from "../components/Route/Categories.jsx";
import BestDeals from "../components/Route/BestDeals.jsx";
import FeatureProducts from "../components/Route/FeatureProducts.jsx";
import Events from "../components/Route/Events.jsx";
import Sponsers from "../components/Route/Sponsers.jsx";
import Footer from "../components/Layout/Footer.jsx";
const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      <div
        className=" w-full bg-no-repeats 800px:h-screen h-[70vh]  bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
          // https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80
          // https://images.unsplash.com/photo-1506806770414-b0e5db562f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80
        }}
      >
        <Header activeHeading={1} />
        <Hero />
      </div>
      <div className="bg-gradient-to-b from-gray-900 to-black">
        <Categories />
        <BestDeals />
        <Events />
        <FeatureProducts />
        <Sponsers />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
