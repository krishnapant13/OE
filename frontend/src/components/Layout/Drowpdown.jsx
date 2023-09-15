import React from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const Drowpdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload(true);
  };
  return (
    <div className="pb-4 w-[270px] h-[400px] overflow-scroll bg-[#fff] absolute z-30 rounded-b-md shadow-sm ">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default Drowpdown;
