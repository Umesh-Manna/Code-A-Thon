import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Skyintel/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import "./SolarLayout.css";

const SolarLayout = ({ children }) => {
    const navigate = useNavigate()
    const [activeFilter, setActiveFilter] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="solar-layout">

        {/* ================= SIDEBAR (LOCKED) ================= */}
        <aside className="live-sky-sidebar-area">
            <div
            className={`live-sky-sidebar-content ${
                isSidebarOpen ? "expanded" : ""
            }`}
            >
                <Sidebar />
            </div>
        </aside>


        {/* ================= NAVBAR (LOCKED) ================= */}
        <nav className="live-sky-navbar-area">
            <Navbar />
        </nav>
    
        {/* ================= SCROLLABLE CONTENT ================= */}
        <main className="live-sky-scroll-area">
            {children}
        </main>
    </div>
  );
};

export default SolarLayout;
