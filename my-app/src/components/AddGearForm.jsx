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
    form.append("name", formData.name);
    form.append("material", formData.material);
    form.append("pricePerDay", formData.pricePerDay);
    form.append("rating", formData.rating);
    form.append("description", formData.description);
    form.append("main_image", formData.main_image);

    try {
      const res = await fetch(`${API_URL}/api/gear`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload gear.");
      }

      const result = await res.json();
      alert(`Gear added: ${result.name}`);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="add-gear-form" style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Add New Gear</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name:
          <input type="text" name="name" required onChange={handleChange} />
        </label>
        <br />

        <label>
          Material:
          <input type="text" name="material" required onChange={handleChange} />
        </label>
        <br />

        <label>
          Price Per Day:
          <input type="number" name="pricePerDay" step="0.01" required onChange={handleChange} />
        </label>
        <br />

        <label>
          Rating:
          <input type="number" name="rating" step="0.1" min="0" max="5" required onChange={handleChange} />
        </label>
        <br />

        <label>
          Description:
          <input type="text" name="description" onChange={handleChange} />
        </label>
        <br />

        <label>
          Image:
          <input type="file" name="main_image" accept="image/*" required onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Add Gear</button>
      </form>
    </div>
  );
}
