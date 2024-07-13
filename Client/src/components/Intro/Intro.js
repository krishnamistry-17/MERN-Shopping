/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import "../Intro/Intro.css"; // Ensure you have a CSS file for styling

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1>Welcome to Our Shop</h1>
        <p>Discover the best products at amazing prices.</p>
        <div className="cta-buttons">
          <NavLink to="/login" className="btn">
            Login
          </NavLink>
          <NavLink to="/register" className="btn">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Intro;
