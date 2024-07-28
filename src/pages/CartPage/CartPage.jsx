/* eslint-disable react/prop-types */
// import React from 'react'
import ShoppingCart from '../../component/ShoppingCart/ShoppingCart'
import Delivery from "../../component/Delivery/Delivery"
import Location from '../../component/Location/Location';
const CartPage = ({ setCheckoutAllowed }) => {
  return (
    <div>
      <ShoppingCart setCheckoutAllowed={setCheckoutAllowed} />
      <Delivery />
      <Location />
    </div>
  );
};

export default CartPage