/** @format */

import React from "react";
import "./css/Errorpage.css";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>We are sorry,page not found!</h2>
          <p className="mb-5">
            The page you are looking for might have been removed had its name
            changed or is temporarly unavailable.
          </p>
          <NavLink to="/">Back To Homepage</NavLink>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
