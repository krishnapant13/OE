import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  UserForgotPassword,
  SellerActivationPage,
  HomePage,
  BestSelling,
  Products,
  FAQ,
  Events,
  ProductsDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage,
  ShopPreviewPage,
  CheckoutPage,
  PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Routes";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { ShopHomePage } from "./routes/ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import axios from "axios";
import { server } from "./server";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import NetworkCheck from "./components/Layout/NetworkCheck";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./routes/AdminProtectedRoute";

import ProtectedARoute from "./routes/ProtectedARoutes";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");
  const [isNetworkError, setIsNetworkError] = useState(false); // Add the state

  const [key, setKey] = useState(null);
  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeapikey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
    const handleNetworkChange = () => {
      setIsNetworkError(!navigator.onLine);
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);
  useEffect(() => {
    if (stripeApikey) {
      const stripePromise = loadStripe(stripeApikey);
      setKey(stripePromise);
    }
  }, [stripeApikey]);
  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={key}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />{" "}
                </ProtectedRoute>
              }
            />{" "}
          </Routes>
        </Elements>
      )}
      {isNetworkError && <NetworkCheck />}{" "}
      {/* Render the popup if there's a network error */}
      {/* ...other routes and components */}
      <Routes>
        {/* user routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductsDetailsPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="activation/:activation_token"
          element={<ActivationPage />}
        />{" "}
        <Route path="/forgot-password" element={<UserForgotPassword />} />{" "}
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop routes */}
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />{" "}
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />{" "}
        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupons />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithdrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        {/* admin routes  */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedARoute>
              <AdminDashboardPage />
            </ProtectedARoute>
          }
        />{" "}
        <Route
          path="/admin-users"
          element={
            <ProtectedARoute>
              <AdminDashboardUsers />
            </ProtectedARoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedARoute>
              <AdminDashboardSellers />
            </ProtectedARoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedARoute>
              <AdminDashboardOrders />
            </ProtectedARoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedARoute>
              <AdminDashboardProducts />
            </ProtectedARoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedARoute>
              <AdminDashboardEvents />
            </ProtectedARoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedARoute>
              <AdminDashboardWithdraw />
            </ProtectedARoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ width: "max-content" }}
      />
    </BrowserRouter>
  );
};

export default App;
