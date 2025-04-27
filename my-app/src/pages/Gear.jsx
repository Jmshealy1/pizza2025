import React, { useState, useEffect } from "react";
import AddGearForm from "../components/AddGearForm";
import EditGearForm from "../components/EditGearForm";
import "../css/Gear.css";

const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3001"
  : "https://express-rlba.onrender.com";

export default function Gear() {
  const [gearData, setGearData] = useState([]);
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/gear`)
      .then((res) => res.json())
      .then((data) => setGearData(data))
      .catch((err) => console.error("Error loading gear data:", err));
  }, []);

  const handleAddToCart = (item) => {
    const rawDays = quantities[item._id];
    const days = isNaN(parseInt(rawDays)) || parseInt(rawDays) <= 0 ? 1 : parseInt(rawDays);
    const price = parseFloat(item.pricePerDay ?? 0);
    const total = isNaN(price * days) ? 0 : price * days;

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

  const openAddDialog = () => setShowAddDialog(true);
  const closeAddDialog = () => setShowAddDialog(false);
  const closeEditDialog = () => setEditItem(null);

  const updateGearList = (newItem) => {
    if (newItem.main_image?.includes("/")) {
      const parts = newItem.main_image.split("/");
      newItem.main_image = parts[parts.length - 1];
    }

    setGearData((prev) => {
      const filtered = prev.filter((item) => item._id !== newItem._id);
      return [...filtered, newItem];
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gear?");
    if (!confirmDelete) return;

    const response = await fetch(`${API_URL}/api/gear/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setGearData((prev) => prev.filter((item) => item._id !== id));
      setResult("Gear deleted successfully.");
    } else {
      setResult("Failed to delete item.");
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  return (
    <div className="gear-page">
      <h2>Hunting Gear & Reviews</h2>
      <button id="add-gear" onClick={openAddDialog}>+</button>
      {result && <p className="status-message">{result}</p>}

      {showAddDialog && (
        <div className="w3-modal" style={{ display: "block" }}>
          <div className="w3-modal-content">
            <AddGearForm closeForm={closeAddDialog} updateGearList={updateGearList} />
          </div>
        </div>
      )}

      {editItem && (
        <div className="w3-modal" style={{ display: "block" }}>
          <div className="w3-modal-content">
            <EditGearForm
              item={editItem}
              closeForm={closeEditDialog}
              updateGearList={updateGearList}
              setResult={setResult}
            />
          </div>
        </div>
      )}

      <div className="gear-list">
        {gearData.map((item) => (
          <div key={item._id} className="gear-item">
            <img
              src={`${API_URL}/images/${(item.main_image ?? "default.jpg").replace(/^images\//, "")}`}
              alt={item.name}
              onError={handleImageError}
            />
            <div className="gear-info">
              <h3>{item.name}</h3>
              <p><strong>Material:</strong> {item.material || "N/A"}</p>
              <p><strong>Rating:</strong> {item.rating ?? "N/A"}</p>
              <p className="price">{item.pricePerDay !== undefined ? `$${item.pricePerDay} per day` : "Price N/A"}</p>
              <div className="cart-controls">
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
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
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
