/** @format */

import React, { useContext } from "react";
import "../pages/css/Cart.css";
import { ShopContext } from "../context/ShopContext";
import remove_icon from "../components/Assets/cart_cross_icon.png";

const Cart = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
  } = useContext(ShopContext);

  // Function to format currency to Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>{formatCurrency(product.new_price)}</p>
                <div className="cartitem-quantity">
                  <div className="quantity-control">
                    <button
                      className="quantity-button"
                      onClick={() => decreaseQuantity(product.id)}>
                      -
                    </button>
                    <span className="quantity">{cartItems[product.id]}</span>
                    <button
                      className="quantity-button"
                      onClick={() => increaseQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </div>
                <p>
                  {formatCurrency(product.new_price * cartItems[product.id])}
                </p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  alt=""
                  onClick={() => {
                    removeFromCart(product.id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-term">
        <div className="cartitems total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>{formatCurrency(getTotalCartAmount())}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="delivery-details">
        <h3>Delivery Details:</h3>
        <br />
        <input type="name" placeholder="Enter First Name"></input>
        <br />
        <br />
        <input type="name" placeholder="Enter Last Name"></input>
        <br />
        <br />
        <input type="email" placeholder="Enter Email Id"></input>
        <br />
        <br />
        <input type="number" placeholder="Enter Phone Number"></input>
        <br />
        <br />
        <input type="text" placeholder="Enter Complete Address"></input>
        <br />
        <br />
      </div>

      <div className="payement-details">
        <h3>Payment Details:</h3>
        <br />
        <input type="number" placeholder="Enter Card Details"></input>
        <br />
        <br />
        <input type="number" placeholder="Enter Expiry Date"></input>
        <br />
        <br />
        <input type="number" placeholder="cvv"></input>
        <br />
        <br />
        <input type="name" placeholder="Enter card holder name"></input>
        <br />
        <br />
        <button className="place-order">Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
