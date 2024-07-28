/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { useNavigate, useParams } from "react-router-dom";
import "./SuccessPage.css";
import axios from "axios";
import { useEffect } from "react";
const SuccessPage = () => {
  const navigate = useNavigate();
  // const orderId = useParams();
  // const server = import.meta.env.VITE_SERVER;

  // useEffect(() => {
  //   const succeededFun = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${server}/api/Cart/PaymentSucceeded?orderId=${orderId.orderId}`,
  //         orderId
  //       );
  //     } catch (error) {
  //       console.error("Error creating payment intent:", error);
  //     }
  //   };
  //   succeededFun();
  // }, [orderId]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="icon-container">
          <span className="success-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#f66f00"
              viewBox="0 0 24 24"
            >
              <path d="M10 15.172l-4.95-4.95-1.414 1.414L10 18 20.364 7.636l-1.414-1.414z" />
            </svg>
          </span>
        </div>
        <h1>Bezahlung erfolgreich</h1>
        <p>
          Vielen Dank für Ihre Zahlung! Ihre Transaktion wurde erfolgreich
          abgeschlossen.
        </p>
        <button onClick={() => navigate("/")}>Zur Startseite</button>
      </div>
    </div>
    
  );
};

export default SuccessPage;
