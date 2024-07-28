/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./Check.css";
import { useDispatch, useSelector } from "react-redux";
import { handleCheck } from "../../reduxTool/CheckSlice";
import { Link } from "react-router-dom";

const Check = ({ prePrice, discount, totalPrice, paymentUrl }) => {
    const [checkUser,setCheckUser]=useState(false);
    const handleCheck=()=>{
      setCheckUser(!checkUser);
    }
  return (
    <div className="checkContainer">
      <div className="checkPolicy">
        <p>
          Ihre persönlichen Daten werden verwendet, um Ihre Bestellung zu
          bearbeiten, Ihre Erfahrung auf dieser Webseite zu verbessern und für
          eine detailierte Beschreibung der Verwendung Ihrer Daten, lesen Sie
          bitte unsere.
        </p>
        <Link to="/Datenschutzbestimmungen">
          <p className="p-link">Datenschutzbestimmungen</p>
        </Link>
      </div>
      <div className="check">
        <label>
          <input type="checkbox" onChange={handleCheck} />
          Ich habe die Allgemeine Geschäftsbestimmungen gelesen und stimme ihnen
          zu.
        </label>
        <hr />
        <h1 className="highlight">Rechnungsdetails :-</h1>
        <div className="price-container">
          <h2>Total: </h2>
          <p>CHF {prePrice.toFixed(2)} </p>
        </div>
        <div className="price-container">
          <h2>Coupon-Rabatt: </h2>
          <p>CHF {discount.toFixed(2)} </p>
        </div>
        <div className="price-container ">
          <h2>Gesamtsumme: </h2>
          <p>CHF {totalPrice.toFixed(2)} </p>
        </div>
        <button
          onClick={() => (window.location.href = paymentUrl)}
          className={!checkUser ? "btn-pay disable" : "btn-pay"}
          disabled={!checkUser}
        >
          Zur Kasse gehen
        </button>
      </div>
    </div>
  );
};

export default Check;
