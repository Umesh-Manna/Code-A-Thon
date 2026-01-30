import React, { useEffect, useState } from "react";
import { fetchMoonNow, fetchLunarEclipse } from "./api";
import MoonWebGL from "./MoonWebGL";
import SunEarthMoonMap from "./SunEarthMoonMap";
import Countdown from "./Countdown";
import "./moon.css";

/* ===============================
   Helper: UTC → Local date only
   =============================== */
function localDay(utcISO) {
  if (!utcISO) return "-";
  return new Date(utcISO).getDate(); // device local date
}

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
          <option value="positions">Sun–Earth–Moon Positions</option>
          <option value="eclipse">Lunar Eclipse</option>
        </select>
      </header>

      {error && <p className="error">{error}</p>}

      {/* =====================================================
          SECTION 1 — LIVE MOON PHASE (DO NOT TOUCH)
         ===================================================== */}
      {view === "moon" && moon && (
        <>
          <div className="moon-panel">
            <MoonWebGL illumination={moon.illumination} />
          </div>

          <div className="moon-info">
            <p>
              <strong>Phase:</strong> {moon.phase}
            </p>
            <p>
              <strong>Geometric Illumination:</strong>{" "}
              {moon.illumination}%
            </p>
            <p>
              <strong>Lunar Age:</strong> {moon.age} days
            </p>
          </div>
        </>
      )}

      {/* =====================================================
          SECTION 2 — SUN–EARTH–MOON POSITIONS
         ===================================================== */}
      {view === "positions" && moon && (
        <>
          {/* 2D Map */}
          <SunEarthMoonMap
            sunAngle={moon.sun_angle}
            moonAngle={moon.moon_angle}
          />

          {/* Countdown */}
          <div className="countdown-box">
            <h3>🌕 Countdown to Next Full Moon</h3>
            <Countdown target={moon.next_full_moon} />
            <div className="local-time">
              Local time:{" "}
              {new Date(moon.next_full_moon).toLocaleString()}
            </div>
          </div>

          {/* Next 4 Phases */}
          <h3 className="section-title">🌙 Next 4 Moon Phases</h3>
          <div className="phase-cards">
            {moon.next_phases.map((p) => (
              <div key={p.name} className="phase-card">
                <strong>{p.name}</strong>
                <div>{new Date(p.utc).toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <h3 className="section-title">
            📅 Moon Phases Calendar – Next 12 Months
          </h3>

          <table className="phase-calendar">
            <thead>
              <tr>
                <th>Month</th>
                <th>New Moon</th>
                <th>First Quarter</th>
                <th>Full Moon</th>
                <th>Last Quarter</th>
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
          LUNAR ECLIPSE (KEPT AS-IS)
         ===================================================== */}
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
