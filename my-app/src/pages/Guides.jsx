import React from "react";
import "../css/Guides.css";

export default function Guides() {
  return (
    <div className="guides-page">
      <section className="trip-banner">
        <img src={`${process.env.PUBLIC_URL}/images/border.jpg`} alt="Hunting Trip" />
      </section>

      <section className="hunting-guides">
        <div className="guide">
          <img src={`${process.env.PUBLIC_URL}/images/huntingguideforest.jpg`} alt="Forest Hunting" />
          <div className="guide-info">
            <h3>Forest Hunting</h3>
            <p>
              Venture deep into dense forests with expert guidance from Blair, Joey, Duane, and Kyler.
              These seasoned hunters know the best trails, feeding grounds, and hidden spots to find trophy game...
            </p>
          </div>
        </div>

        <div className="guide">
          <img src={`${process.env.PUBLIC_URL}/images/huntingguidemountain.jpg`} alt="Mountain Hunting" />
          <div className="guide-info">
            <h3>Mountain Hunting</h3>
            <p>
              Take on high-altitude hunting challenges with Cole Kramer, a renowned mountain hunting guide with over 15 years of experience...
            </p>
          </div>
        </div>

        <div className="guide">
          <img src={`${process.env.PUBLIC_URL}/images/huntingguidedesert.jpg`} alt="Desert Hunting" />
          <div className="guide-info">
            <h3>Desert Hunting</h3>
            <p>
              Experience the unique challenges of desert hunting with elite guides like Jake “Dust Devil” Morrison and Elijah “Sharp Eye” Carter...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
