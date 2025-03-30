import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
      <img src="/images/logo.png" alt="TrailHunter Logo" />
      </div>
      <h1>TrailHunter</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/hunting-guides">Hunting Guides</Link></li>
        <li><Link to="/gear-and-review">Gear & Reviews</Link></li>
        <li><Link to="/community-hub">Community Hub</Link></li>
        <li><Link to="/plan-your-trip">Plan Your Trip</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;