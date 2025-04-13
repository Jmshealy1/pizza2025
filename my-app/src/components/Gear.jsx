import React, { useState, useEffect } from "react";
import GearItem from "../components/GearItem";
import "../css/Gear.css";

const Gear = () => {
  const [gearItems, setGearItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("/json/json-equipment.json")
      .then((res) => res.json())
      .then((data) => setGearItems(data))
      .catch((err) => console.error("Error loading gear data:", err));
  }, []);

  const addToCart = (item, days) => {
    const quantity = days > 0 ? days : 1;
    const updatedCart = { ...cart };
    updatedCart[item._id] = {
      ...item,
      days: quantity,
      total: quantity * item.pricePerDay,
    };
    setCart(updatedCart);
    const total = calculateTotal(updatedCart);
    localStorage.setItem("gearTotal", total);
    localStorage.setItem("gearCart", JSON.stringify(updatedCart));
    updateTripTotals(total);
    alert(`${item.name} added to cart.`);
  };

  const calculateTotal = (cartObj) => {
    return Object.values(cartObj)
      .reduce((acc, item) => acc + item.total, 0)
      .toFixed(2);
  };

  const updateTripTotals = (gearTotal) => {
    const tripTotalSpan = document.getElementById("trip-total");
    const gearTotalSpan = document.getElementById("gear-total");

    if (gearTotalSpan) gearTotalSpan.textContent = gearTotal;
    if (tripTotalSpan) tripTotalSpan.textContent = gearTotal;
  };

  useEffect(() => {
    const storedTotal = localStorage.getItem("gearTotal") || "0.00";
    updateTripTotals(storedTotal);
  }, []);

  return (
    <div className="gear-page">
      <h2>Gear & Reviews</h2>
      <div className="gear-list">
        {gearItems.map((item) => (
          <GearItem key={item._id} item={item} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Gear;
