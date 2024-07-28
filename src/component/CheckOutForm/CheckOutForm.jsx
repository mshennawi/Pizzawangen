/* eslint-disable no-unused-vars */
// import React from 'react'
import "./CheckOutForm.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import checkOut from "../../assets/images/checkOut.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { successCheckOut } from "../../reduxTool/AuthContext";
import { useLocation } from "react-router-dom";

const CheckOutForm = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  const server = import.meta.env.VITE_SERVER;
  const [delivers, setDilevers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();
  const { isCheckedOut } = useSelector((state) => state.auth);
  const location =useLocation();
  const userId=location.state?.response;
  const addressCity=location.state?.city;

  
  const [formData, setFormData] = useState({
    userId: `${userId}`,
    salute:"",
    name: "",
    street: "",
    city: "",
    postBox: "",
    discountCode: "",
    notes: "",
    deliveryTime: "",
    email: "",
    mobile: "",
    paymentWay: 0,
  });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let city, postBox;
    const matchedDelivery = delivers?.data?.find(
      (del) => del.city === addressCity
    );
    if (matchedDelivery) {
      city = matchedDelivery.city;
      postBox = matchedDelivery.postBox;
      setSelectedCity(postBox + " " + city);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      city: city,
      postBox: postBox,
    }));
  }, [selectedCity,delivers?.data,addressCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSending(true);
    try {
      
      const response = await axios.post(`${server}/api/Cart/order`, formData);
      toast.success("Check your email");
      dispatch(successCheckOut());
      navigate("/cart/checkOut/payment", {
        state: { response: response.data},
      });
      setSent(true);
      setFormData({
        salute:"",
        name: "",
        street: "",
        city: "",
        postBox: "",
        deliveryTime: "",
        discountCode: "",
        notes: "",
        email:"",
        mobile:"",
        paymentWay: 0,
      });
    } catch (error) {
      toast.error("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="animated-component"
    >
      <div className="check-out">
        <div className="check-out-image">
          <img src={checkOut} alt="checkOut" />
        </div>
        <div className="check-out-container">
          <form id="orderForm" onSubmit={handleSubmit}>
            <h2>Check Out</h2>
            <div className="form-group">
              <label htmlFor="name">Salute:</label>
              <select
                id="salute"
                name="salute"
                required
                onChange={handleChange}
                value={formData.salute}
              >
                <option value="" disabled>
                  Anrede
                </option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
                <option value="Firma">Firma</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Strasse:</label>
              <input
                type="text"
                id="street"
                name="street"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Ort:</label>
              <input
                type="text"
                id="city"
                name="city"
                //value={selectedCity}
                //disabled
                 onChange={handleChange}
                 required
              />
              {/* {delivers?.data && (
                <select
                  className="select-city"
                  name="address"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value={""}>select City</option>
                  {delivers.data &&
                    delivers.data.map((del) => {
                      return (
                        <option value={[del.postBox, del.city]} key={del.id}>
                          {" "}
                          {del.postBox} , {del.city}
                        </option>
                      );
                    })}
                </select>
              )} */}
            </div>

            <div className="form-group">
              <label htmlFor="discountCode">Rabattcode:</label>
              <input
                type="text"
                id="discountCode"
                name="discountCode"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deliveryTime">Lieferzeit:</label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Nachricht:</label>
              <textarea
                id="notes"
                name="notes"
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" disabled={sending}>
              {sending ? "Senden..." : "check out"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckOutForm;


