import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Guides from "./pages/Guides";
import Gear from "./pages/Gear";
import Community from "./pages/Community";
import Plan from "./pages/Plan";
import Contact from "./pages/Contact";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hunting-guides" element={<Guides />} />
        <Route path="gear-and-review" element={<Gear />} />
        <Route path="community-hub" element={<Community />} />
        <Route path="plan-your-trip" element={<Plan />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  </BrowserRouter>
);