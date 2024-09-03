/** @format */

import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../assets/cross_icon.png";

const ListProduct = ({url}) => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:3001/allproducts");
      const data = await res.json();
      setAllProducts(data);
      console.log("Fetched products:", data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:3001/removeproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="listproduct-format-main listproduct-format">
            <img
              src={`http://localhost:3001${product.image}`}
              alt={product.name}
              className="listproduct-product-item"
            />
            <p>{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img
              onClick={() => removeProduct(product.id)}
              className="listproduct-remove-icon"
              src={cross_icon}
              alt="Remove"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
