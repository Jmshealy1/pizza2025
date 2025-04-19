import React, { useState, useEffect } from "react";
import "../css/Gear.css";

const API_URL = "https://express-rlba.onrender.com";

export default function Gear() {
  const [gearData, setGearData] = useState([]);
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/api/gear`)
      .then((res) => res.json())
      .then((data) => setGearData(data))
      .catch((err) => console.error("Error loading gear:", err));
  }, []);

  const handleAddToCart = (item) => {
    const days = Math.max(1, parseInt(quantities[item._id]) || 1);
    const total = item.pricePerDay * days;
    const updatedCart = {
      ...cart,
      [item._id]: { ...item, days, total },
    };
    setCart(updatedCart);
    localStorage.setItem("gearTotal", total.toFixed(2));
    alert(`${item.name} added for ${days} day(s).`);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const resetCart = () => {
    setCart({});
    localStorage.setItem("gearTotal", "0.00");
    alert("Cart reset.");
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `${API_URL}/images/default.jpg`;
  };

  return (
    <div className="gear-page">
      <h2>Hunting Gear & Reviews</h2>
      <div className="gear-list">
        {gearData.map((item) => (
          <div key={item._id} className="gear-item">
            <img
              src={`${API_URL}/${item.main_image || "images/default.jpg"}`}
              alt={item.name}
              onError={handleImageError}
            />
            <div className="gear-info">
              <h3>{item.name}</h3>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Rating:</strong> {item.rating}</p>
              <p className="price">${item.pricePerDay.toFixed(2)} per day</p>
              <label>
                Days:
                <input
                  type="number"
                  min="1"
                  value={quantities[item._id] || 1}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                />
              </label>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={resetCart}>Reset Cart</button>
      </div>
    </div>
  );
}
