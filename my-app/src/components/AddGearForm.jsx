import "../css/AddGearForm.css";
import React, { useState } from "react";

const AddGearForm = (props) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setInputs((prev) => ({ ...prev, [name]: files[0] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target);

    const response = await fetch("https://express-rlba.onrender.com/api/gear", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setResult("Gear added successfully!");
      e.target.reset();
      props.updateGearList(await response.json());
      props.closeForm();
    } else {
      const err = await response.json();
      setResult(`Error: ${err.message}`);
    }
  };

  return (
    <div id="add-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.closeForm}
          >
            &times;
          </span>
          <form id="add-gear-form" onSubmit={onSubmit}>
            <h3>Add New Gear</h3>

            <p>
              <label htmlFor="name">Gear Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                required
                minLength={3}
              />
            </p>

            <p>
              <label htmlFor="pricePerDay">Price Per Day:</label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                value={inputs.pricePerDay || ""}
                onChange={handleChange}
                required
                min={0}
              />
            </p>

            <p>
              <label htmlFor="material">Material:</label>
              <input
                type="text"
                id="material"
                name="material"
                value={inputs.material || ""}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <label htmlFor="rating">Rating (0–5):</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={inputs.rating || ""}
                onChange={handleChange}
                min="0"
                max="5"
                required
              />
            </p>

            <p>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={inputs.description || ""}
                onChange={handleChange}
              />
            </p>

            <section className="columns">
              <p id="img-prev-section">
                {inputs.main_image && (
                  <img
                    id="img-prev"
                    src={URL.createObjectURL(inputs.main_image)}
                    alt="Preview"
                  />
                )}
              </p>
              <p id="img-upload">
                <label htmlFor="main_image">Upload Image:</label>
                <input
                  type="file"
                  id="main_image"
                  name="main_image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </p>
            </section>

            <p>
              <button type="submit">Submit</button>
            </p>
            <p>{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGearForm;
