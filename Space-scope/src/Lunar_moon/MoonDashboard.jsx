import React, { useEffect, useState } from "react";
import { fetchMoonNow, fetchLunarEclipse } from "./api";
import MoonWebGL from "./MoonWebGL";
import "./moon.css";

const MoonDashboard = () => {
  const [view, setView] = useState("moon");
  const [moon, setMoon] = useState(null);
  const [eclipse, setEclipse] = useState(null);
  const [error, setError] = useState(null);

  /* ===========================
     Fetch Moon & Eclipse Data
  ============================ */
  useEffect(() => {
    const loadMoon = (lat, lon) => {
      fetchMoonNow(lat, lon)
        .then(setMoon)
        .catch(() => setError("Failed to fetch moon data"));
    };

    // Try geolocation, fallback if denied
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadMoon(pos.coords.latitude, pos.coords.longitude),
        () => loadMoon(0, 0)
      );
    } else {
      loadMoon(0, 0);
    }

    fetchLunarEclipse()
      .then(setEclipse)
      .catch(() => {});
  }, []);

  return (
    <div className="moon-dashboard">
      {/* ================= Header ================= */}
      <header className="moon-header">
        <h1>🌙 Moon & Lunar Eclipse Dashboard</h1>

        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="moon">Live Moon Phase</option>
          <option value="eclipse">Lunar Eclipse</option>
        </select>
      </header>

      {error && <p className="error">{error}</p>}

      {/* ================= Moon View ================= */}
      {view === "moon" && moon && (
        <>
          <div className="moon-panel">
            {/* WebGL Moon */}
            <MoonWebGL illumination={moon.illumination} />
          </div>

          <div className="moon-info">
            <p>
              <strong>Phase:</strong> {moon.phase}
            </p>
            <p>
              <strong>Geometric Illumination:</strong> {moon.illumination}%
            </p>
            <p>
              <strong>Lunar Age:</strong> {moon.age} days
            </p>
          </div>
        </>
      )}

      {/* ================= Eclipse View ================= */}
      {view === "eclipse" && eclipse && (
        <div className="moon-info">
          <p>
            <strong>Type:</strong> {eclipse.type}
          </p>
          <p>
            <strong>Date:</strong> {eclipse.date}
          </p>
          <p>
            <strong>Visibility:</strong> {eclipse.visibility}
          </p>
        </div>
      )}
    </div>
  );
};

export default MoonDashboard;
