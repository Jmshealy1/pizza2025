import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="nav-border">
        <img src={`${process.env.PUBLIC_URL}/images/border.jpg`} alt="Navigation Border" />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
