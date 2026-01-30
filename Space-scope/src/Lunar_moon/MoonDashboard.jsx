import React, { useEffect, useState } from "react";
import { fetchMoonNow, fetchLunarEclipse } from "./api";
import MoonWebGL from "./MoonWebGL";
import SunEarthMoonMap from "./SunEarthMoonMap";
import DayNightMap from "./DayNightMap";
import Countdown from "./Countdown";
import "./moon.css";

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

      {/* ===============================
          SECTION 1 — LIVE MOON PHASE
         =============================== */}
      {view === "moon" && moon && (
        <>
          <div className="moon-panel">
            <MoonWebGL illumination={moon.illumination} />
          </div>

          <div className="moon-info">
            <p><strong>Phase:</strong> {moon.phase}</p>
            <p><strong>Geometric Illumination:</strong> {moon.illumination}%</p>
            <p><strong>Lunar Age:</strong> {moon.age} days</p>
          </div>

          {/* ---- SAFE DETAILS TABLE ---- */}
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

      {/* ===============================
          SECTION 2 — POSITIONS
         =============================== */}
      {view === "positions" && moon && (
        <>
          <SunEarthMoonMap
            sunAngle={moon.sun_angle}
            moonAngle={moon.moon_angle}
          />

          <div className="countdown-box">
            <h3>🌕 Countdown to Next Full Moon</h3>
            <Countdown target={moon.next_full_moon} />
          </div>
        </>
      )}

      {/* ===============================
          SECTION 3 — DAY / NIGHT MAP
         =============================== */}
      {view === "eclipse" && <DayNightMap />}
    </div>
  );
};

export default MoonDashboard;
