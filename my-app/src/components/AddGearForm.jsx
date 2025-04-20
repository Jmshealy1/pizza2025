import React, { useState } from "react";
import "../css/AddGearForm.css";

const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3001"
  : "https://express-rlba.onrender.com";

export default function AddGearForm({ closeForm, updateGearList }) {
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState("");

  const handleImagePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${API_URL}/api/gear`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        updateGearList(data);
        e.target.reset();
        setPreview("");
        setResult("Gear added successfully.");
        closeForm();
      } else {
        setResult(data.message || "Error adding gear.");
      }
    } catch (err) {
      setResult("Network error: " + err.message);
    }
  };

  return (
    <form id="add-gear-form" onSubmit={handleSubmit}>
      <h3>Add New Gear</h3>

      <label htmlFor="name">Name:</label>
      <input name="name" id="name" type="text" required minLength={3} />

      <label htmlFor="material">Material:</label>
      <input name="material" id="material" type="text" required />

      <label htmlFor="pricePerDay">Price per Day ($):</label>
      <input name="pricePerDay" id="pricePerDay" type="number" step="0.01" min="0" required />

      <label htmlFor="rating">Rating (0–5):</label>
      <input name="rating" id="rating" type="number" step="0.1" min="0" max="5" required />

      <label htmlFor="description">Description:</label>
      <input name="description" id="description" type="text" />

      <label htmlFor="main_image">Upload Image:</label>
      <input name="main_image" id="main_image" type="file" accept="image/*" onChange={handleImagePreview} />

      {preview && <img id="img-preview" src={preview} alt="preview" style={{ maxWidth: "200px", marginTop: "1rem" }} />}

      <button type="submit">Submit</button>
      <button type="button" onClick={closeForm}>Cancel</button>
      <p>{result}</p>
    </form>
  );
}
