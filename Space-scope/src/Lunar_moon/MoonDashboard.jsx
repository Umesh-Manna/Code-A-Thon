import React, { useEffect, useRef, useState } from "react";
import { fetchMoonNow, fetchLunarEclipse } from "./api";
import "./moon.css";

const MoonDashboard = () => {
  const canvasRef = useRef(null);

  const [view, setView] = useState("moon");
  const [moon, setMoon] = useState(null);
  const [eclipse, setEclipse] = useState(null);
  const [error, setError] = useState(null);

  /* ===========================
     Fetch Moon + Eclipse Data
  ============================ */
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

    fetchLunarEclipse()
      .then(setEclipse)
      .catch(() => {});
  }, []);

  /* ===========================
     Canvas Rendering
  ============================ */
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const moonR = 60;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Space
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, size, size);

    // ===========================
    // MOON PHASE MODE
    // ===========================
    if (view === "moon" && moon) {
      // Full moon
      ctx.beginPath();
      ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
      ctx.fillStyle = "#eaeaea";
      ctx.fill();
      ctx.closePath();

      const illumination = moon.illumination / 100;
      const phaseAngle = Math.acos(illumination);
      const isWaxing = moon.phase.includes("Waxing");

      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.ellipse(
        cx + (isWaxing ? -1 : 1) * Math.cos(phaseAngle) * moonR,
        cy,
        Math.abs(Math.sin(phaseAngle)) * moonR,
        moonR,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.closePath();

      ctx.globalCompositeOperation = "source-over";
    }

    // ===========================
    // ECLIPSE MODE
    // ===========================
    if (view === "eclipse") {
      // Penumbra
      ctx.beginPath();
      ctx.arc(cx + 40, cy, moonR * 1.9, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100,100,100,0.3)";
      ctx.fill();
      ctx.closePath();

      // Umbra
      ctx.beginPath();
      ctx.arc(cx + 40, cy, moonR * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30,30,30,0.8)";
      ctx.fill();
      ctx.closePath();

      // Moon inside shadow
      ctx.beginPath();
      ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
      ctx.fillStyle = "#b45a2a"; // copper eclipse tint
      ctx.fill();
      ctx.closePath();
    }
  }, [moon, view]);

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

      <section className="card">
        <div className="moon-wrapper">
          <canvas ref={canvasRef} width={240} height={240} />
        </div>

        {view === "moon" && moon && (
          <div className="info">
            <p><strong>Phase:</strong> {moon.phase}</p>
            <p>
              <strong>Geometric Illumination:</strong> {moon.illumination}%
            </p>
            <p><strong>Lunar Age:</strong> {moon.age} days</p>
          </div>
        )}

        {view === "eclipse" && eclipse && (
          <div className="info">
            <p><strong>Type:</strong> {eclipse.type}</p>
            <p><strong>Date:</strong> {eclipse.date}</p>
            <p><strong>Visibility:</strong> {eclipse.visibility}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MoonDashboard;
