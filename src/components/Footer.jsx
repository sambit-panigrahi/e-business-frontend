import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <img src="bus-4.png" alt="Naxora Logo" className="footer-logo" />
          <h2>NAXORA</h2>
          <p>
            Building modern digital experiences with innovation and excellence.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <a href="#experience">Experience</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@naxora.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} NAXORA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
