import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
