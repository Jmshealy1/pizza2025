import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/Plan.css";

const Plan = () => {
  const [gearTotal, setGearTotal] = useState(0);
  const [packagePrice, setPackagePrice] = useState(0);
  const [tripTotal, setTripTotal] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numDays, setNumDays] = useState(1);

  const location = useLocation();

  const calculateDuration = (start, end) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e - s;
    const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return days;
  };

  const getValidGearTotal = () => {
    const stored = localStorage.getItem("gearTotal");
    const parsed = parseFloat(stored);
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    const days = calculateDuration(startDate, endDate);
    setNumDays(days);

    const storedGear = getValidGearTotal();
    const calculatedGearTotal = storedGear * days;
    setGearTotal(calculatedGearTotal);

    const calculatedTripTotal = calculatedGearTotal + packagePrice;
    setTripTotal(calculatedTripTotal);
  }, [location.pathname, packagePrice, startDate, endDate]);

  const handlePackageChange = (e) => {
    const value = e.target.value;
    let price = 0;
    if (value === "basic") price = 500;
    else if (value === "deluxe") price = 1200;
    else if (value === "ultimate") price = 2500;

    setPackagePrice(price);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reservation submitted!");
  };

  const resetCart = () => {
    localStorage.setItem("gearTotal", "0.00");
    setGearTotal(0);
    setTripTotal(packagePrice);
    alert("Rental gear cart reset.");
  };

  return (
    <div className="plan-trip">
      <section className="trip-packages">
        <h2>Choose Your Hunting Package</h2>
        <div className="packages-container">
          <div className="package">
            <h3>Basic Hunting Experience</h3>
            <p>Includes guided hunting in a designated area.</p>
            <p><strong>Price:</strong> $500 per person</p>
          </div>
          <div className="package">
            <h3>Deluxe Hunting Adventure</h3>
            <p>Includes guided hunting and an overnight stay.</p>
            <p><strong>Price:</strong> $1,200 per person</p>
          </div>
          <div className="package">
            <h3>Ultimate Trophy Hunt</h3>
            <p>Full guided experience with expert tracking support.</p>
            <p><strong>Price:</strong> $2,500 per person</p>
          </div>
        </div>
      </section>

      <section className="trip-form-container">
        <div className="trip-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/plantripleft.jpg`}
            alt="Plan Trip"
          />
        </div>

        <form className="trip-form" onSubmit={handleSubmit}>
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
            <select id="package" name="package" required onChange={handlePackageChange}>
              <option value="">-- Select Package --</option>
              <option value="basic">Basic - $500</option>
              <option value="deluxe">Deluxe - $1,200</option>
              <option value="ultimate">Ultimate - $2,500</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
              required
              onChange={handleStartDateChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              name="end-date"
              required
              onChange={handleEndDateChange}
            />
          </div>

          <h3>Days Selected: {numDays} day(s)</h3>
          <h3>Rental Gear Total: ${gearTotal.toFixed(2)}</h3>
          <h3>Trip Total: ${tripTotal.toFixed(2)}</h3>

          <button type="submit" className="submit-btn">Reserve Now</button>
          <button type="button" className="submit-btn" onClick={resetCart}>
            Reset Rental Cart
          </button>
        </form>
      </section>
    </div>
  );
};

export default Plan;
