import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";

const UserPasswordChange = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisibility] = useState(false);
  const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(`Local IP Address: ${window.location}`);
  });
  const handleCheckUser = async (e) => {
    e.preventDefault();
    try {
      // Send a GET request to check if the user exists by email
      const response = await axios.get(
        `${server}/user/user-info-email/${email}`
      );
      if (response.data.success) {
        setPasswordChangeVisible(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/user/change-password`, {
        email,
        newPassword,
      });

      if (response?.data?.success) {
        toast.success("Password Changed");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple to-black flex flex-col justify-center p-2 800px:p-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Password Change
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 shadow sm:rounded-lg px-10">
          <form
            className="space-y-6"
            onSubmit={
              passwordChangeVisible ? handleChangePassword : handleCheckUser
            }
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Find Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {passwordChangeVisible && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-bg-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {passwordChangeVisible ? "Change Password" : "Check User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPasswordChange;
