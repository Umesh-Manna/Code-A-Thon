import React, { useEffect, useState } from "react";
import { fetchMoonNow } from "./api";
import SunEarthMoonMap from "./SunEarthMoonMap";
import DayNightMap from "./DayNightMap";
import Countdown from "./Countdown";
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
          SECTION 1 — LIVE MOON PHASE (NO WEBGL)
         ===================================================== */}
      {view === "moon" && moon && (
        <>
          <div className="moon-panel">
            <img
              src="/textures/moon_static.jpg"
              alt="Moon surface"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="moon-info">
            <p><strong>Phase:</strong> {moon.phase}</p>
            <p><strong>Geometric Illumination:</strong> {moon.illumination}%</p>
            <p><strong>Lunar Age:</strong> {moon.age} days</p>
          </div>

          {moon.details && (
            <table className="moon-details">
              <tbody>
                <tr>
                  <td>Constellation</td>
                  <td>{moon.details.constellation}</td>
                </tr>
                <tr>
                  <td>RA (JNow)</td>
                  <td>{moon.details.ra.toFixed(2)}°</td>
                </tr>
                <tr>
                  <td>Dec (JNow)</td>
                  <td>{moon.details.dec.toFixed(2)}°</td>
                </tr>
                <tr>
                  <td>Distance to Earth</td>
                  <td>{moon.details.distance_km.toLocaleString()} km</td>
                </tr>
                <tr>
                  <td>Apparent Size</td>
                  <td>{moon.details.angular_size_arcmin} arcmin</td>
                </tr>
                <tr>
                  <td>Orbital Speed</td>
                  <td>{moon.details.orbital_speed_kmh} km/h</td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}

      {/* =====================================================
          SECTION 2 — SUN–EARTH–MOON POSITIONS (RESTORED)
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

          {/* 12-Month Calendar */}
          <h3 className="section-title">
            📅 Moon Phases Calendar – Next 12 Months (Local Dates)
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

          <p className="calendar-note">
            Dates are shown in <strong>your local time zone</strong> (based on your device time).
          </p>
        </>
      )}

      {/* =====================================================
          SECTION 3 — DAY / NIGHT MAP
         ===================================================== */}
      {view === "eclipse" && (
        <>
          <h3>🌍 Live Earth Day / Night Map</h3>
          <DayNightMap />
        </>
      )}
    </div>
  );
};

export default MoonDashboard;
