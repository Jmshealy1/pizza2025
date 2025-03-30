import React from "react";
import "../css/GearItem.css";

const GearItem = ({ item }) => {
    return (
        <div className="gear-item">
            <img src={item.img} alt={item.name} />
            <div className="gear-info">
                <h3>{item.name}</h3>
                <p><strong>Material:</strong> {item.material}</p>
                <p><strong>Rating:</strong> {item.rating}</p>
                <p>{item.description}</p>
                <p className="price">${item.pricePerDay} per day</p>
            </div>
        </div>
    );
};

export default GearItem;