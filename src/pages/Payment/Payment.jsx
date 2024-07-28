/* eslint-disable no-unused-vars */
// import React from 'react'

import PaymentForm from "../../component/PaymentForm/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Payment.css";
import Check from "../../component/Check/Check";
import { useSelector } from "react-redux";
import CheckSlice from "../../reduxTool/CheckSlice";
import Location from "../../component/Location/Location";
const Payment = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  // const [clientSecret, setClientSecret] = useState("");
  const [prePrice, setPrePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentUrl,setPaymentUrl]=useState("")
  // const server = import.meta.env.VITE_SERVER;
  // const publishKey = import.meta.env.VITE_PUPLISH_KEY;
  // const stripePromise = loadStripe(`${publishKey}`);
  const location = useLocation();
  const response = location.state?.response;

  useEffect(() => {
    if(response){
       setPrePrice(response?.data?.totalNumber);
       setDiscount(response?.data?.discountValue);
       setTotalPrice(response?.data?.finalTotalNumber);
       setPaymentUrl(response?.paymentPageUrl);
    }
  }, [response]);




  return (
    <div className="payment-container">
      {/* {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm orderID={keyId} /> */}
      <Check
        prePrice={prePrice ? prePrice : 0}
        discount={discount ? discount : 0}
        totalPrice={totalPrice ? totalPrice : 0}
        paymentUrl={paymentUrl ? paymentUrl : ""}
      />
      {/* </Elements>
      )} */}
      <Location />
    </div>
  );
};

export default Payment;
