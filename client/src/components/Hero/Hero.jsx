/** @format */

import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero.jpg";

const Hero = () => {
  const scrollToNewCollection = () => {
    const newCollectionSection = document.getElementById(
      "new-collection-section"
    );
    if (newCollectionSection) {
      window.scrollTo({
        top: newCollectionSection.offsetTop,
        behavior: "smooth", // Smooth scrolling animation
      });
    }
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Collection</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn" onClick={scrollToNewCollection}>
          <button className="hero-latetst-btn"> Latest Collection</button>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt=""></img>
      </div>
    </div>
  );
};

export default Hero;
