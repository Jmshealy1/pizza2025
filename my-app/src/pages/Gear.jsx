// === pages/Gear.jsx ===
import React, { useEffect, useState } from "react";
import GearItem from "../components/GearItem";
import "../css/Gear.css";

export default function Gear() {
  const [gearList, setGearList] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchGear = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/Jmshealy1/jmshealy1.github.io/main/csce242/projects/part6/json/json-equipment.json");
        if (!response.ok) throw new Error("Failed to fetch gear list");
        const data = await response.json();
        setGearList(data);
      } catch (error) {
        console.error("Error loading gear:", error);
      }
    };

    fetchGear();
  }, []);

  const addToCart = (item, days) => {
    const existing = cart.find((i) => i._id === item._id);
    const updatedCart = existing
      ? cart.map((i) => i._id === item._id ? { ...i, days, totalCost: item.pricePerDay * days } : i)
      : [...cart, { ...item, days, totalCost: item.pricePerDay * days }];
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for reserving your gear. Items will be available for pickup upon arrival.");
    setCart([]);
  };

  return (
    <div className="gear-page">
      <section className="trip-banner">
        <img src="/images/border.jpg" alt="Hunting Trip" />
      </section>

      <section className="gear-reviews">
        <h2>Hunting Gear & Reviews</h2>
        <div className="gear-list">
          {gearList.map((item) => (
            <GearItem key={item._id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>Your Rental Cart</h2>
        <div id="cart-items">
          {cart.map((item) => (
            <p key={item._id}>
              {item.name} - ${item.pricePerDay}/day × {item.days} days = ${item.totalCost.toFixed(2)}
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </p>
          ))}
        </div>
        <p><strong>Total Cost:</strong> ${cart.reduce((total, item) => total + item.totalCost, 0).toFixed(2)}</p>
        <button onClick={checkout}>Proceed to Checkout</button>
      </section>
    </div>
  );
}
