/** @format */

import React from "react";
import "./Admin.css";
import Sidebar from "../../Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../AddProduct/AddProduct";
import ListProduct from "../../ListProduct/ListProduct";

const url = "http://localhost:3001";

const DefaultComponent = () => {
  return <div>Welcome to the Admin Dashboard</div>;
};

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DefaultComponent />} />
        <Route path="/addproduct" element={<AddProduct url={url} />} />
        <Route path="/listproduct" element={<ListProduct url={url} />} />
      </Routes>
    </div>
  );
};

export default Admin;
