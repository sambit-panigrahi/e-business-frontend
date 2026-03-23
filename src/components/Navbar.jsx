import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="bus-4.png"  
          alt="Naxora Logo"
          className="logo"
        />
        <h2 className="company-name">NAXORA</h2>
      </div>

      <div className="navbar-right">
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
        <a href="#experience">Experience</a>
      </div>
    </nav>
  );
};

export default Navbar;
