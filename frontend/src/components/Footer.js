import React from "react";
// 1. Import Link from react-router-dom
import { Link } from "react-router-dom";
import "../assets/css/WIindex.css";
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

// 2. Remove bootstrap.min.css import. It's already in App.js.
// import "../assets/css/bootstrap.min.css"; 

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <img
              src={logo}
              alt="Travel Agency Logo"
              width="150"
              className="mb-3"
            />
            <p>
              Explore the world with us. Your trusted partner in creating
              unforgettable journeys and wonderful memories.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              {/* 3. Replaced all <a> tags with <Link> */}
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/destinations" className="footer-link">Destinations</Link></li>
              <li><Link to="/packages" className="footer-link">Packages</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Get in Touch</h5>
            <p><i className="bi bi-geo-alt"></i> Mumbai, India</p>
            <p><i className="bi bi-envelope"></i> info@travelagency.com</p>
            <p><i className="bi bi-telephone"></i> +91 98765 43210</p>

            <div className="mt-3">
              {/* These are external links, so <a> is fine */}
              <a href="#" className="me-3 social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3 social-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="me-3 social-icon"><i className="bi bi-twitter"></i></a>
              <a href="#" className="me-3 social-icon"><i className="bi bi-linkedin"></i></a>
          .</div>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">
          {/* 4. Made the year dynamic */}
          © {new Date().getFullYear()} Travel Agency. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;