import React, { useState } from "react";

const API_URL = "https://express-rlba.onrender.com";

export default function AddGear() {
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
        throw new Error(error.message || "Upload failed");
      }

      const result = await res.json();
      alert(`Gear added: ${result.name}`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add New Gear</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="text" name="material" placeholder="Material" required onChange={handleChange} />
        <input type="number" name="pricePerDay" placeholder="Price Per Day" step="0.01" required onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating" step="0.1" min="0" max="5" required onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <input type="file" name="main_image" accept="image/*" required onChange={handleChange} />
        <button type="submit">Add Gear</button>
      </form>
    </div>
  );
}
