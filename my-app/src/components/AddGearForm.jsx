import React, { useState } from "react";
import "../css/AddGearForm.css";

const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3001"
  : "https://express-rlba.onrender.com";

export default function AddGearForm({ closeForm, updateGearList }) {
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const formData = new FormData(e.target);

    try {
      const res = await fetch(`${API_URL}/api/gear`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        updateGearList(data);
        setStatus("Gear added successfully!");
        closeForm();
      } else {
        setStatus(data.message || "Failed to add gear.");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            className="w3-button w3-display-topright"
            onClick={closeForm}
          >
            &times;
          </span>

          <form id="add-gear-form" onSubmit={handleSubmit}>
            <h3>Add New Gear</h3>

            <p>
              <label>Name:</label>
              <input type="text" name="name" required minLength={3} />
            </p>

            <p>
              <label>Material:</label>
              <input type="text" name="material" required />
            </p>

            <p>
              <label>Price Per Day:</label>
              <input type="number" name="pricePerDay" step="0.01" required />
            </p>

            <p>
              <label>Rating:</label>
              <input type="number" name="rating" step="0.1" min="0" max="5" required />
            </p>

            <p>
              <label>Description:</label>
              <input type="text" name="description" />
            </p>

            <p>
              <label>Image:</label>
              <input type="file" name="main_image" accept="image/*" onChange={handleImageChange} />
            </p>

            {preview && (
              <p>
                <img id="img-prev" src={preview} alt="Preview" />
              </p>
            )}

            <p>
              <button type="submit">Submit</button>
            </p>
            <p>{status}</p>
          </form>
        </div>
      </div>
    </div>
  );
}