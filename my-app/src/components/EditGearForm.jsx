import React, { useState } from "react";
import "../css/AddGearForm.css";

const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3001"
  : "https://express-rlba.onrender.com";

export default function EditGearForm({ item, closeForm, updateGearList, setResult }) {
  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "pricePerDay" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 3) return setResult("Name must be at least 3 characters.");
    if (formData.rating < 0 || formData.rating > 5) return setResult("Rating must be between 0 and 5.");
    if (formData.pricePerDay < 0) return setResult("Price must be positive.");

    const response = await fetch(`${API_URL}/api/gear/${formData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updated = await response.json();
      updateGearList(updated);
      setResult("Item updated successfully.");
      closeForm();
    } else {
      setResult("Error updating item.");
    }
  };

  return (
    <form className="edit-gear-form" onSubmit={handleSubmit}>
      <h3>Edit Gear</h3>
      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} required minLength="3" />

      <label>Material:</label>
      <input name="material" value={formData.material} onChange={handleChange} required />

      <label>Price Per Day:</label>
      <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} min="0" step="0.01" />

      <label>Rating:</label>
      <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" />

      <label>Description:</label>
      <input name="description" value={formData.description} onChange={handleChange} />

      <button type="submit">Update</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
}
