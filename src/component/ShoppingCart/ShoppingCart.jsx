/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { useState, useEffect } from "react";
import "./ShoppingCart.css";
import Image from "../../assets/images/panerBoy.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addMeal,
  addMealFromCart,
  deleteMeal,
  removeMeal,
} from "../../reduxTool/CartSlice";
import emptyCart from "../../assets/images/emptyCart.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const ShoppingCart = ({ setCheckoutAllowed }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [delivers, setDilevers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [minimumOrderAb, setMinimumOrderAb] = useState("");
  const cart = useSelector((state) => state.cart);
  const server = import.meta.env.VITE_SERVER;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleOrderClick = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(`${server}/api/Cart/cart/add`, cart);
      // console.log("cart", cart);
      toast.success("success");
      setSent(true);
      setCheckoutAllowed(true);
      navigate("/cart/checkOut", { state: { response: response.data ,city:selectedCity } });
    } catch (err) {
      toast.error("Failed to send");
    } finally {
      setSending(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/api/Delivery/GetAllDelivery`);
        if (!response.ok) {
          // throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDilevers(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const getAddress=(e)=>{
    const address=e.target.value;
    // console.log("address",address);
    const orderAb = address.match(/\d+/);
    setMinimumOrderAb(orderAb);
     const cityMatch = address.match(/[a-zA-Z\s]+/);
     const city = cityMatch ? cityMatch[0].trim() : "";
     setSelectedCity(city);
    //  console.log(selectedCity)
     
  }
  // console.log("cart", cart);

  return (
    <div className="cart-container">
      <h1 className="highlight">Wangen</h1>
      {cart.totalItems === 0 && (
        <img className="empty-cart" src={emptyCart} alt="emptyCart" />
      )}
      {cart.totalItems > 0 && (
        <select className="select-city" onChange={getAddress}>
          <option value={""}>Stadt wählen </option>
          {delivers.data &&
            delivers.data.map((del) => {
              return (
                <option value={[del.orderAb, del.city]} key={del.id}>
                  {" "}
                  {del.postBox} {del.city}
                </option>
              );
            })}
        </select>
      )}
      {cart.totalItems > 0 &&
        cart.items.map((meal, index) => {
          return (
            <div className="cart-item" key={index}>
              <img
                src={`${server}/Images/${meal.photoName}`}
                alt={meal.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{meal.name}</h3>
                <p className="price">
                  Preis :{" "}
                  <span className="highlight">
                    CHF {meal.totalPrice.toFixed(2)}
                  </span>
                </p>
                <p className="description" key={top.id}>
                  {meal.extensions.map((top) => {
                    return (
                      <span key={top.id} className="cart-topings">
                        {top.name +" "} ,{" "}
                      </span>
                    );
                  })}
                </p>
                <div className="quantity-container">
                  Menge : <span className="highlight"> {meal.quantity}</span>
                </div>
                <div className="cart-buttons">
                  <button
                    className="remove-button"
                    onClick={() => dispatch(addMealFromCart(meal))}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => dispatch(deleteMeal(meal))}
                  >
                    -
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => dispatch(removeMeal(meal))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      {cart.totalItems > 0 && (
        <>
          <h2 className="total-price">
            Gesamtpreis : CHF
            <span className="highlight">
              {" "}
              {cart.totalPrice.toFixed(2)}{" "}
            </span>{" "}
          </h2>
          {minimumOrderAb === "" && (
            <p className="minimumOrderAb">
              Sie müssen eine Stadt auswählen ....
            </p>
          )}
          {cart.totalPrice < minimumOrderAb && minimumOrderAb !== "" && (
            <p className="minimumOrderAb">
              Der Einkaufswert erreicht nicht die erforderliche Mindestgrenze
              für eine Lieferung in Ihre Region! Ab CHF{" "}
              {parseFloat(minimumOrderAb).toFixed(2)}...
            </p>
          )}
          <button
            className="shopping-cart-order"
            onClick={handleOrderClick}
            disabled={
              cart.totalPrice < minimumOrderAb ||
              minimumOrderAb === "" ||
              sending
                ? true
                : false
            }
          >
            {sending ? "Senden ..." : "Befehl"}
          </button>
        </>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default ShoppingCart;
