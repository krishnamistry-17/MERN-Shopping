/** @format */

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "./css/PaymentPage.css";

const PaymentPage = () => {
  const { clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCashOnDelivery = () => {
    alert("Your order has been placed with Cash on Delivery!");

    // Clear the cart
    clearCart();

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Method is: </h1>
        <div className="payment-option" onClick={handleCashOnDelivery}>
          Cash on Delivery
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
