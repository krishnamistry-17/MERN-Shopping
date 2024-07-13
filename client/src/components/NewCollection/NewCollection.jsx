/** @format */

import React from "react";
import "./NewCollection.css";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";

const NewCollection = (props) => {
  // Function to format currency to Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="new-collection" id="new-collection-section">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
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

export default NewCollection;
