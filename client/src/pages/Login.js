/** @format */

import sign from "../components/Assets/login.jpg";
import "../pages/css/Login.css";
import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        window.alert(data.error || "Invalid Credentials");
      } else {
        dispatch({ type: "USER", payload: true });
        window.alert("Login Successful");

        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="register">
      <form method="POST" onSubmit={loginUser}>
        <div className="register-container">
          <h1>Login Page</h1>
          <img className="image" src={sign} alt="" />

          <div className="register-fields">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-button">
              <input
                type="submit"
                name="signin"
                id="signin"
                className="form-submit"
                value="Log In"
              />
            </div>
            <NavLink to="/register" className="signup-navlink">
              Create an account
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
