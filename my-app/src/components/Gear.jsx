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
      .then((data) => {
        setGearData(data);
      })
      .catch((err) => console.error("Error loading gear data:", err));
  }, []);

  const handleAddToCart = (item) => {
    const rawDays = quantities[item._id];
    const days = isNaN(parseInt(rawDays)) || parseInt(rawDays) <= 0 ? 1 : parseInt(rawDays);

    const price = Number(item.pricePerDay);
    if (isNaN(price)) {
      console.error("Invalid price for item:", item);
      alert("This item has an invalid price.");
      return;
    }

    const total = price * days;

    const updatedCart = {
      ...cart,
      [item._id]: { ...item, days, total },
    };

    setCart(updatedCart);

    const updatedTotal = Object.values(updatedCart).reduce(
      (sum, i) => sum + (isNaN(i.total) ? 0 : i.total),
      0
    );

    localStorage.setItem("gearTotal", updatedTotal.toFixed(2));
    alert(`${item.name} added to cart for ${days} day(s).`);
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
              src={`${API_URL}/images/${item.main_image || "default.jpg"}`}
              alt={item.name}
              onError={handleImageError}
            />
            <div className="gear-info">
              <h3>{item.name}</h3>
              <p><strong>Material:</strong> {item.material || "N/A"}</p>
              <p><strong>Rating:</strong> {item.rating !== undefined ? item.rating : "N/A"}</p>
              <p className="price">
                {item.pricePerDay !== undefined ? `$${Number(item.pricePerDay).toFixed(2)} per day` : "Price N/A"}
              </p>
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

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={resetCart}>Reset Cart</button>
      </div>
    </div>
  );
}