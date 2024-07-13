/** @format */

import React, { useState } from "react";
import "../pages/css/Register.css";
import sign from "../components/Assets/sign.jpg";
import { useNavigate, NavLink } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          cpassword,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data || data.error) {
        window.alert(data.error || "Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("Registration Successful");
        console.log("Successful Registration");

        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="register">
      <form method="POST">
        <div className="register-container">
          <h1>Registration Page</h1>
          <img className="image" src={sign} alt="" />

          <div className="register-fields">
            <input
              type="text"
              value={user.name}
              onChange={handleInputs}
              placeholder="Enter Your Name"
              autoComplete="off"
              name="name"
              id="name"
            />
            <input
              type="email"
              placeholder="Enter Your Email Address"
              autoComplete="off"
              value={user.email}
              onChange={handleInputs}
              name="email"
              id="email"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              autoComplete="off"
              value={user.password}
              onChange={handleInputs}
              name="password"
              id="password"
            />
            <input
              type="password"
              placeholder="Enter Confirm Password"
              autoComplete="off"
              value={user.cpassword}
              onChange={handleInputs}
              name="cpassword"
              id="cpassword"
            />
            <input
              type="number"
              placeholder="Enter Your Phone Number"
              autoComplete="off"
              value={user.phone}
              onChange={handleInputs}
              name="phone"
              id="phone"
            />
            <input
              type="submit"
              name="signup"
              id="signup"
              value="Register"
              onClick={PostData}
            />

            <NavLink to="/login" className="signup-navlink">
              I am already registered
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
