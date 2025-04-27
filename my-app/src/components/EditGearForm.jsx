import React, { useState, useEffect } from "react";
import "../css/AddGearForm.css";

const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3001"
  : "https://express-rlba.onrender.com";

export default function EditGearForm({ item, closeForm, updateGearList, setResult }) {
  const [formData, setFormData] = useState({
    name: item.name,
    material: item.material,
    pricePerDay: item.pricePerDay,
    rating: item.rating,
    description: item.description,
  });
  const [imageFile, setImageFile] = useState(null);
  const [prevSrc, setPrevSrc] = useState("");

  useEffect(() => {
    setPrevSrc(`${API_URL}/images/${(item.main_image ?? "default.jpg").replace(/^images\//, "")}`);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setPrevSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending update...");

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });
    if (imageFile) {
      data.append("main_image", imageFile);
    }

    try {
      const response = await fetch(`${API_URL}/api/gear/${item._id}`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        const updatedItem = await response.json();
        updateGearList(updatedItem);
        setResult("Gear updated successfully.");
        closeForm();
      } else {
        const err = await response.json();
        setResult(err.message || "Failed to update gear.");
      }
    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <form id="add-gear-form" onSubmit={handleSubmit}>
      <h3>Edit Gear</h3>

      <p>
        <label htmlFor="name">Gear Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required minLength="3" />
      </p>

      <p>
        <label htmlFor="material">Material:</label>
        <input type="text" name="material" value={formData.material} onChange={handleChange} required />
      </p>

      <p>
        <label htmlFor="pricePerDay">Price Per Day ($):</label>
        <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required min="0" />
      </p>

      <p>
        <label htmlFor="rating">Rating (0–5):</label>
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="0" max="5" step="0.1" />
      </p>

      <p>
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </p>

      <section className="columns">
        <div>
          {prevSrc && <img id="img-prev" src={prevSrc} alt="preview" />}
        </div>
        <p>
          <label htmlFor="main_image">Update Image:</label>
          <input type="file" name="main_image" accept="image/*" onChange={handleImageChange} />
        </p>
      </section>

      <p>
        <button type="submit">Update</button>
      </p>
    </form>
  );
}
