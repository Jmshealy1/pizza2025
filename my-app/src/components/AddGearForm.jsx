import React, { useState } from "react";

const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3001"
  : "https://express-rlba.onrender.com";

export default function AddGearForm({ closeForm, updateGearList }) {
  const [formData, setFormData] = useState({
    name: "",
    material: "",
    pricePerDay: "",
    rating: "",
    description: "",
    main_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "main_image") {
      setFormData((prev) => ({ ...prev, main_image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      form.append(key, val);
    });

    try {
      const res = await fetch(`${API_URL}/api/gear`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add gear.");
      }

      const newItem = await res.json();

      // Ensure the image path is properly formatted
      if (newItem.main_image && !newItem.main_image.startsWith("images/")) {
        newItem.main_image = `images/${newItem.main_image}`;
      }

      updateGearList(newItem);
      closeForm();
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div className="add-gear-form">
      <h3>Add New Gear</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Gear Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price Per Day"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          step="0.1"
          min="0"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="main_image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}