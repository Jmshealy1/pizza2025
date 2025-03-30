// === components/Header.jsx ===
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="TrailHunter Logo"
        />
      </div>
      <h1 className="site-title">TrailHunter</h1>

      <div className="menu-wrapper" ref={menuRef}>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>

        <nav className={menuOpen ? "nav active" : "nav"}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hunting-guides">Hunting Guides</Link></li>
            <li><Link to="/gear-and-review">Gear & Reviews</Link></li>
            <li><Link to="/community-hub">Community Hub</Link></li>
            <li><Link to="/plan-your-trip">Plan Your Trip</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}