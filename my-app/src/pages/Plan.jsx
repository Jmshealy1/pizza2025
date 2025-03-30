import React from "react";
import "../css/Plan.css";

export default function Plan() {
  return (
    <div className="plan-page">

      <section className="trip-packages">
        <h2>Choose Your Hunting Package</h2>
        <div className="packages-container">
          <div className="package">
            <h3>Basic Hunting Experience</h3>
            <p>Includes guided hunting in a designated area.</p>
            <p><strong>Price:</strong> $500 per person (gear not included, please visit the gear-and-review page to reserve gear)</p>
          </div>
          <div className="package">
            <h3>Deluxe Hunting Adventure</h3>
            <p>Includes guided hunting and an overnight stay in a hunting cabin.</p>
            <p><strong>Price:</strong> $1,200 per person (gear not included, please visit the gear-and-review page to reserve gear)</p>
          </div>
          <div className="package">
            <h3>Ultimate Trophy Hunt</h3>
            <p>Full guided experience with expert tracking support.</p>
            <p><strong>Price:</strong> $2,500 per person (gear not included, please visit the gear-and-review page to reserve gear)</p>
          </div>
        </div>
      </section>

      <section className="trip-form-container">
        <div className="trip-image">
          <img src={`${process.env.PUBLIC_URL}/images/plantripleft.jpg`} alt="Planning a Trip" />
        </div>

        <form className="trip-form">
          <h2>Reserve Your Trip</h2>

          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>

          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>

          <div className="form-group">
            <label htmlFor="package">Select Package:</label>
            <select id="package" name="package" required>
              <option value="basic">Basic Hunting Experience - $500</option>
              <option value="deluxe">Deluxe Hunting Adventure - $1,200</option>
              <option value="ultimate">Ultimate Trophy Hunt - $2,500</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" id="start-date" name="start-date" required />
          </div>

          <div className="form-group">
            <label htmlFor="end-date">End Date:</label>
            <input type="date" id="end-date" name="end-date" required />
          </div>

          <h3>Rental Gear Total: $<span id="gear-total">0.00</span></h3>
          <h3>Trip Total: $<span id="trip-total">0.00</span></h3>

          <button type="submit" className="submit-btn">Reserve Now</button>
        </form>
      </section>
    </div>
  );
}
