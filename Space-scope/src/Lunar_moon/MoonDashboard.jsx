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
    <div className="moon-dashboard">
      <header className="moon-header">
        <h1>🌙 Moon & Lunar Eclipse Dashboard</h1>

        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="moon">Live Moon Phase</option>
          <option value="eclipse">Lunar Eclipse</option>
        </select>
      </header>

      {error && <p className="error">{error}</p>}

      {view === "moon" && moon && (
        <>
          <div className="moon-panel">
            <MoonWebGL illumination={moon.illumination} />
          </div>

          {/* ===== Dynamic Moon Data Table ===== */}
          <table className="moon-table">
            <tbody>
              <tr><td>Constellation</td><td>{moon.constellation}</td></tr>
              <tr><td>Moon Phase</td><td>{moon.phase}</td></tr>
              <tr><td>Illumination</td><td>{moon.illumination}%</td></tr>
              <tr><td>RA (JNow)</td><td>{moon.ra}</td></tr>
              <tr><td>Dec (JNow)</td><td>{moon.dec}</td></tr>
              <tr><td>Altitude</td><td>{moon.altitude}</td></tr>
              <tr><td>Azimuth / Direction</td><td>{moon.azimuth}</td></tr>
              <tr><td>Rise Time</td><td>{moon.rise_time}</td></tr>
              <tr><td>Set Time</td><td>{moon.set_time}</td></tr>
              <tr><td>Distance to Earth</td><td>{moon.distance}</td></tr>
              <tr><td>Apparent Size</td><td>{moon.apparent_size}</td></tr>
              <tr><td>Orbital Speed</td><td>{moon.orbital_speed}</td></tr>
            </tbody>
          </table>
        </>
      )}

      {view === "eclipse" && eclipse && (
        <div className="moon-info">
          <p><strong>Type:</strong> {eclipse.type}</p>
          <p><strong>Date:</strong> {eclipse.date}</p>
          <p><strong>Visibility:</strong> {eclipse.visibility}</p>
        </div>
      )}
    </div>
  );
};

export default MoonDashboard;
