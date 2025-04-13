import React, { useState, useEffect } from "react";
import AddGearForm from "../components/AddGearForm";
import "../css/Gear.css";

const API_URL = "http://localhost:3001"; // Change to Render URL in production

export default function Gear() {
  const [gearData, setGearData] = useState([]);
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/gear`)
      .then((res) => res.json())
      .then((data) => setGearData(data))
      .catch((err) => console.error("Error loading gear data:", err));
  }, []);

  const handleAddToCart = (item) => {
    const days = quantities[item._id] || 1;
    const total = item.pricePerDay * days;

    const updatedCart = {
      ...cart,
      [item._id]: { ...item, days, total }
    };

    setCart(updatedCart);

    const updatedTotal = Object.values(updatedCart).reduce(
      (sum, i) => sum + i.total,
      0
    );

    localStorage.setItem("gearTotal", updatedTotal.toFixed(2));

    alert(`${item.name} added to cart for ${days} day(s).`);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, parseInt(value) || 1)
    }));
  };

  const resetCart = () => {
    setCart({});
    localStorage.setItem("gearTotal", "0.00");
    alert("Cart reset.");
  };

  const openAddDialog = () => setShowAddDialog(true);
  const closeAddDialog = () => setShowAddDialog(false);

  const updateGearList = (newItem) => {
    setGearData((prev) => [...prev, newItem]);
  };

  return (
    <div className="gear-page">
      <h2>Hunting Gear & Reviews</h2>

      <button id="add-gear" onClick={openAddDialog}>+</button>

      {showAddDialog && (
        <AddGearForm
          closeForm={closeAddDialog}
          updateGearList={updateGearList}
        />
      )}

      <div className="gear-list">
        {gearData.map((item) => (
          <div key={item._id} className="gear-item">
            <img
              src={`${API_URL}/images/${item.main_image}`}
              alt={item.name}
            />
            <div className="gear-info">
              <h3>{item.name}</h3>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Rating:</strong> {item.rating}</p>
              <p>{item.description}</p>
              <p className="price">${item.pricePerDay} per day</p>
              <div className="cart-controls">
                <label>
                  Days: {" "}
                  <input
                    type="number"
                    min="1"
                    value={quantities[item._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
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