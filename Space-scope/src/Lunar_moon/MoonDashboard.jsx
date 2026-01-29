import React, { useEffect, useState } from "react";
import { fetchMoonNow, fetchLunarEclipse } from "./api";
import MoonWebGL from "./MoonWebGL";
import "./moon.css";

const MoonDashboard = () => {
  const [view, setView] = useState("moon");
  const [moon, setMoon] = useState(null);
  const [eclipse, setEclipse] = useState(null);
  const [error, setError] = useState(null);

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

    fetchLunarEclipse().then(setEclipse).catch(() => {});
  }, []);

  return (
    <div className="moon-fullscreen">
      {/* Header overlay */}
      <header className="moon-overlay">
        <h1>🌙 Moon & Lunar Eclipse Dashboard</h1>

        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="moon">Live Moon Phase</option>
          <option value="eclipse">Lunar Eclipse</option>
        </select>
      </header>

      {error && <div className="error-overlay">{error}</div>}

      {/* ===== MOON VIEW (WebGL) ===== */}
      {view === "moon" && moon && (
        <MoonWebGL illumination={moon.illumination} />
      )}

      {/* ===== ECLIPSE VIEW (placeholder) ===== */}
      {view === "eclipse" && (
        <div className="eclipse-placeholder">
          Eclipse view coming next
        </div>
      )}

      {/* Info panel */}
      {moon && view === "moon" && (
        <div className="info-overlay">
          <p><strong>Phase:</strong> {moon.phase}</p>
          <p><strong>Geometric Illumination:</strong> {moon.illumination}%</p>
          <p><strong>Lunar Age:</strong> {moon.age} days</p>
        </div>
      )}
    </div>
  );
};

export default MoonDashboard;
