import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Box, Grid } from "@mui/material";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setzipCode] = useState();
  const [visible, setVisibility] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "krishnapant1303@gmail.com") {
      toast.error("You are not authorized to become a seller");
      return;
    }
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("address", address);
    newForm.append("zipCode", zipCode);
    newForm.append("phoneNumber", phoneNumber);
    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setPassword("");
        setEmail("");
        setAvatar("");
        setAddress("");
        setPhoneNumber();
        setzipCode();
      })
      .catch((error) => {
        toast.error("Seller already exists", error);
      });
  };
  return (
    <div className="h-screen bg-gradient-to-r from-blue-900 via-purple to-black flex flex-col justify-center items-center p-2 800px:p-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto w-md">
        <div className="bg-white py-10 shadow sm:rounded-lg px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="phoneNumber"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="address"
                      name="address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="zip-code"
                      required
                      value={zipCode}
                      onChange={(e) => setzipCode(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={20}
                        onClick={() => setVisibility(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={20}
                        onClick={() => setVisibility(true)}
                      />
                    )}
                  </div>
                </Grid>{" "}
                <Grid item xs={12} sm={6} lg={6} xl={6}>
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="mt-2 flex items-center">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <RxAvatar alt="avatar" className="h-8 w-8 " />
                      )}
                    </span>
                    <label
                      htmlFor="file-input"
                      className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span className="cursor-pointer">Uplod a file</span>
                      <input
                        type="file"
                        name="avatar"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-trasparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
