import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const { state } = useContext(UserContext);
  const { getTotalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState("shop");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const menuRef = useRef();

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li onClick={() => setMenu("shop")}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
            {menu === "shop"}
          </li>
          <li onClick={toggleCategoryDropdown}>
            <span style={{ cursor: "pointer" }}>Category</span>
            {isCategoryDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/mens"
                    style={{ textDecoration: "none" }}
                    onClick={() => setMenu("mens")}
                  >
                    Men
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/womens"
                    style={{ textDecoration: "none" }}
                    onClick={() => setMenu("womens")}
                  >
                    Women
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/kids"
                    style={{ textDecoration: "none" }}
                    onClick={() => setMenu("kids")}
                  >
                    Kids
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li onClick={() => setMenu("about")}>
            <NavLink to="/about" style={{ textDecoration: "none" }}>
              About
            </NavLink>
            {menu === "about"}
          </li>
          <li onClick={() => setMenu("contact")}>
            <NavLink to="/contact" style={{ textDecoration: "none" }}>
              Contact
            </NavLink>
            {menu === "contact"}
          </li>
          <li onClick={() => setMenu("logout")}>
            <NavLink to="/logout" style={{ textDecoration: "none" }}>
              Logout
            </NavLink>
            {menu === "logout"}
          </li>
          
        </>
      );
    } else {
      return (
        <>
          <li onClick={() => setMenu("home")}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
            {menu === "home"}
          </li>
          <li onClick={() => setMenu("about")}>
            <NavLink to="/about" style={{ textDecoration: "none" }}>
              About
            </NavLink>
            {menu === "about"}
          </li>
          <li onClick={() => setMenu("contact")}>
            <NavLink to="/contact" style={{ textDecoration: "none" }}>
              Contact
            </NavLink>
            {menu === "contact"}
          </li>
          <li onClick={() => setMenu("login")}>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              Login
            </NavLink>
            {menu === "login"}
          </li>
          <li onClick={() => setMenu("register")}>
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              Register
            </NavLink>
            {menu === "register"}
          </li>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <ul ref={menuRef} className="nav-menu">
        <RenderMenu />
      </ul>
      {state && (
        <div className="nav-login-cart">
          <Link to="/cart">
            <img src={cart_icon} alt="cart" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
