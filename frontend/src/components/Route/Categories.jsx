import React from "react";
import styles from "../../styles/styles";
import { brandingData, categoriesData } from "../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-20 xl:grid-cols-5 xl:gap-30">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = () => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-auto flex flex-col items-center justify-between cursor-pointer overflow-hidden p-4 transition duration-300 hover:shadow-neon rounded-lg"
                  key={i.id}
                  onClick={handleSubmit}
                >
                  <h5 className="text-18 leading-1.3 text-center">{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-120 object-cover mt-2"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
