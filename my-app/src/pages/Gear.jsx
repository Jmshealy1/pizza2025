import React, { useState, useEffect } from "react";
import "../css/Gear.css";

export default function Gear() {
  const [gearData, setGearData] = useState([]);
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/json-equipment.json`)
      .then((res) => res.json())
      .then((data) => setGearData(data))
      .catch((err) => console.error("Error loading gear data:", err));
  }, []);

  const handleAddToCart = (item) => {
    const days = quantities[item._id] || 1;
    const total = item.pricePerDay * days;
    setCart((prev) => ({
      ...prev,
      [item._id]: { ...item, days, total }
    }));
    alert(`${item.name} added to cart for ${days} day(s).`);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, parseInt(value) || 1)
    }));
  };

  return (
    <div className="gear-page">
      <h2>Hunting Gear & Reviews</h2>
      <div className="gear-list">
        {gearData.map((item) => (
          <div key={item._id} className="gear-item">
            <img src={item.img.replace("../../../../", "/images/")} alt={item.name} />
            <div className="gear-info">
              <h3>{item.name}</h3>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Rating:</strong> {item.rating}</p>
              <p>{item.description}</p>
              <p className="price">${item.pricePerDay} per day</p>
              <div className="cart-controls">
                <label>
                  Days:{" "}
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
          </div>
        ))}
      </div>
    </div>
  );
}
