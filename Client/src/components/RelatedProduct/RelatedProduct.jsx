/** @format */

import React from "react";
import "./RelatedProduct.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";

const RelatedProduct = () => {
  // Function to format currency to Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="relatedproduct">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item">
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={formatCurrency(item.new_price)} // Format new_price to INR
            old_price={formatCurrency(item.old_price)} // Format old_price to INR
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
