// === pages/Home.jsx ===
import React from "react";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="trip-banner">
        <img src="/images/plantriptop.jpg" alt="Hunting Trip Banner" />
      </section>

      <section className="intro-section">
        <h2>Welcome to TrailHunter</h2>
        <p>
          Plan the perfect hunting trip with our guides, gear, and planning tools.
          Explore hunting regions, gear up, and connect with the community.
        </p>
      </section>
    </div>
  );
}
