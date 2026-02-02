import React, { useEffect, useState } from "react";
import { fetchMoonNow } from "./api";

import SunEarthMoonMap from "./SunEarthMoonMap";
import DayNightMap from "./DayNightMap";
import Countdown from "./Countdown";

import Navbar from "../components/Skyintel/Navbar/Navbar";
import Sidebar from "../../../src/components/Sidebar";

import "./moon.css";

/* ===============================
   Helper: UTC → Local date only
=============================== */
function localDay(utcISO) {
  if (!utcISO) return "-";
  return new Date(utcISO).getDate();
}

const MoonDashboard = () => {
  const [view, setView] = useState("moon");
  const [moon, setMoon] = useState(null);
  const [error, setError] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    const loadMoon = (lat, lon) => {
      fetchMoonNow(lat, lon)
        .then(setMoon)
        .catch(() => setError("Failed to fetch moon data"));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadMoon(pos.coords.latitude, pos.coords.longitude),
        () => loadMoon(0, 0)
      );
    } else {
      loadMoon(0, 0);
    }
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 right-0 z-40 skyintel-navbar-fixed" style={{ left: "6rem" }}>
        <Navbar />
      </div>

      {/* Page */}
      <div className="skyintel-page" style={{ paddingLeft: "6rem" }}>
        <div className="moon-dashboard">
          <header className="moon-header">
            <h1>🌙 Moon Dashboard</h1>

            <select value={view} onChange={(e) => setView(e.target.value)}>
              <option value="moon">Live Moon Phase</option>
              <option value="positions">Sun–Earth–Moon Positions</option>
              <option value="eclipse">Day / Night Map</option>
            </select>
          </header>

          {error && <p className="error">{error}</p>}

          {/* =====================================================
              SECTION 1 — LIVE MOON PHASE
             ===================================================== */}
          {view === "moon" && moon && (
            <>
              {/* Moon image */}
              <div className="moon-panel">
                <img
                  src="/textures/moon_static.jpg"
                  alt="Moon surface"
                  className="moon-image"
                />
              </div>

              {/* 3 existing details (UNCHANGED) */}
              <div className="moon-info">
                <p><strong>Phase:</strong> {moon.phase}</p>
                <p><strong>Geometric Illumination:</strong> {moon.illumination}%</p>
                <p><strong>Lunar Age:</strong> {moon.age} days</p>
              </div>

              {/* =================================================
                  ✅ RE-ADDED TABLE (FIX)
                  Appears BELOW the 3 details
                 ================================================= */}
              <h3 className="section-title">
                🌙 Moon Phases Calendar – Next 12 Months
              </h3>

              <table className="phase-calendar">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>New Moon</th>
                    <th>First Quarter</th>
                    <th>Full Moon</th>
                    <th>Third Quarter</th>
                  </tr>
                </thead>
                <tbody>
                  {moon.calendar.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>{localDay(row["New Moon"])}</td>
                      <td>{localDay(row["First Quarter"])}</td>
                      <td>{localDay(row["Full Moon"])}</td>
                      <td>{localDay(row["Last Quarter"])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* =====================================================
              SECTION 2 — SUN–EARTH–MOON POSITIONS (UNCHANGED)
             ===================================================== */}
          {view === "positions" && moon && (
            <>
              <SunEarthMoonMap
                sunAngle={moon.sun_angle}
                moonAngle={moon.moon_angle}
              />

              <div className="countdown-box">
                <h3>🌕 Countdown to Next Full Moon</h3>
                <Countdown target={moon.next_full_moon} />
                <div className="local-time">
                  Local time: {new Date(moon.next_full_moon).toLocaleString()}
                </div>
              </div>

              <h3 className="section-title">🌙 Next 4 Moon Phases</h3>
              <div className="phase-cards">
                {moon.next_phases.map((p) => (
                  <div key={p.name} className="phase-card">
                    <strong>{p.name}</strong>
                    <div>{new Date(p.utc).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* =====================================================
              SECTION 3 — DAY / NIGHT MAP (UNCHANGED)
             ===================================================== */}
          {view === "eclipse" && (
            <>
              <h3>🌍 Live Earth Day / Night Map</h3>
              <DayNightMap />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MoonDashboard;
