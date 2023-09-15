import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [delivered, setDelivered] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [ifscCode, setIFSCCode] = useState("");
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDelivered(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax =
    delivered && delivered.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
      setBankDetails(response.data);
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setBankDetails(null);
    }
  };

  const handlePaymentMethodForm = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-[90vh] px-5 pb-5">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col ">
        <h5 className="pt-2  pl-1 text-[20px] font-[500]">
          Available Balance : ₹ {availableBalance}
        </h5>
        <div
          className={`${styles.button} !rounded-[4px]  bg-gradient-to-r
            from-blue-900
            via-purple
            to-black text-white`}
          onClick={() => setOpen(true)}
        >
          {" "}
          Withdraw Money
        </div>
      </div>
      {open && (
        <div className="w-full fixed top-0 left-0 flex items-center justify-center bg-[#0000008a] h-screen z-[9999]">
          <div
            className={`800px:w-[50%] w-[95%] bg-white shadow rounded ${
              paymentMethod ? "h-[70vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[20px] font-Poppins text-center font-[600]">
                  Add New Payment Method:
                </h3>
                <form onSubmit={handlePaymentMethodForm}>
                  <div>
                    <label>
                      Account Holder Name:{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Account Holder Name"
                      className={`${styles.input} mt-1`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Account Number: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Bank Account Number"
                      className={`${styles.input} mt-1`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      IFSC Code: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter IFSC Code"
                      value={ifscCode}
                      onChange={(e) => setIFSCCode(e.target.value)}
                      className={`${styles.input} mt-1`}
                    />
                    <button onClick={fetchBankDetails}>
                      Fetch Bank Details
                    </button>
                    {bankDetails && (
                      <div>
                        <h3>Bank Name: {bankDetails.BANK}</h3>
                        <p>Branch: {bankDetails.BRANCH}</p>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`${styles.button} mb-3 text-white`}
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-Poppins">
                  Available Payment Methods:
                </h3>
                {seller && seller?.paymentMethods ? (
                  <div>Yes</div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2 ">No Payment Methods!</p>
                    <div className="w-full flex items-center ">
                      <div
                        className={`${styles.button} text-white mt-4 !rounded-[4px]`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add New
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
