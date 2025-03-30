// === pages/Gear.jsx ===
import React from "react";
import GearItem from "../components/GearItem";
import "../css/Gear.css";

const sampleGear = [
  {
    _id: 1,
    name: "Camouflage Tent",
    material: "Canvas",
    rating: 4.5,
    pricePerDay: 25,
    img: "/images/tent.jpg",
    description: "Perfect for overnight hunting trips."
  },
  {
    _id: 2,
    name: "Scope Binoculars",
    material: "Carbon Fiber",
    rating: 4.8,
    pricePerDay: 15,
    img: "/images/binoculars.jpg",
    description: "Spot your target from long distances."
  }
];

export default function Gear() {
  return (
    <div className="gear-page">
      <h2>Gear & Reviews</h2>
      <div className="gear-list">
        {sampleGear.map((item) => (
          <GearItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}