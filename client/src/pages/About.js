/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import myphoto from "../components/Assets/about.jpg";
import "./css/About.css";

const About = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h2 className="about">About Me</h2>

      <form method="GET">
        <div className="row">
          <div className="column">
            <div className="card">
              <img src={myphoto} alt="krishna" className="photo" />
              <div className="container">
                <h2>krishna Mistry</h2>
                <p className="title">Web Developer</p>
                <p>Student at Uka Tarsadiya University </p>
                <p>krishnamistry172003@gmail.com</p>
                <p>
                  <button
                    type="button"
                    className="button"
                    onClick={handleContactClick}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about me</p>
        <p>Create my own unique page.</p>
      </div>
    </>
  );
};

export default About;
