import React from "react";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home">
      

      <section className="hero">
        <h2>Plan Your Next Hunting Adventure</h2>
        <p>Explore the best hunting locations, gear, and expert tips.</p>
        <a href="/hunting-guides" className="btn">View Hunting Guides</a>
      </section>

      <div className="img">
        <img src={`${process.env.PUBLIC_URL}/images/homepagewallpaper.jpg`} alt="Hunting Adventure" />
        <p className="img-description">
          TrailHunter is your ultimate resource for planning guided hunting trips. 
          Whether you're a seasoned hunter or just starting out, we provide expert advice on the best hunting locations, gear, and techniques. 
          Our platform connects you with experienced guides who ensure a safe and successful experience in the wild. 
          Discover top-rated hunting trips, essential survival tips, and the latest gear reviews. 
          Let TrailHunter help you make your next hunting adventure unforgettable.
        </p>
      </div>
    </div>
  );
}
