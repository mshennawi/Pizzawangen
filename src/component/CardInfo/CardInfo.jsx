/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { useNavigate } from "react-router-dom";
import "./CardInfo.css"
import { FaWhatsapp } from "react-icons/fa";
const CardInfo = ({ tel, address, email, whatsapp, pho }) => {
  const navigate =useNavigate()
  return (
    <div className="card-info">
      <div className="card-item">
        <h2>Telefon</h2>
        <p>{pho}</p>
      </div>
      <div className="card-item">
        <h2>Mobile</h2>
        <p>{tel}</p>
      </div>
      {/* <div className="card-item">
        <h2>Address</h2>
        <p>{address}</p>
      </div> */}
      <div className="card-item">
        <h2>E-mail</h2>
        <span>{email}</span>
      </div>
      <div className="card-item whatsApp">
        <FaWhatsapp
          className="icon-whats"
          onClick={() => window.location.href=`https://wa.me/${whatsapp}`}
        />
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span> Chatte mit uns...</span>
        </a>
      </div>
    </div>
  );
};

export default CardInfo