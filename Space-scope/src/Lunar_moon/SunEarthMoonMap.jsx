import { useEffect, useRef } from "react";

const SunEarthMoonMap = ({ sunAngle, moonAngle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    // Earth
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#2a7fff";
    ctx.fill();

    // ---------- Sun ----------
    const sunDist = 130;
    const sunRad = (sunAngle * Math.PI) / 180;

    const sunX = cx + sunDist * Math.cos(sunRad);
    const sunY = cy + sunDist * Math.sin(sunRad);

    ctx.beginPath();
    ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcc00";
    ctx.fill();

    // ---------- Moon orbit ----------
    const moonDist = 80;
    ctx.beginPath();
    ctx.arc(cx, cy, moonDist, 0, Math.PI * 2);
    ctx.strokeStyle = "#666";
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // ---------- Moon ----------
    const moonRad = (moonAngle * Math.PI) / 180;
    const moonX = cx + moonDist * Math.cos(moonRad);
    const moonY = cy + moonDist * Math.sin(moonRad);

    ctx.beginPath();
    ctx.arc(moonX, moonY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#dddddd";
    ctx.fill();

  }, [sunAngle, moonAngle]);

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={360}
      style={{
        display: "block",
        margin: "0 auto",
        borderRadius: "16px",
        background: "#000"
      }}
    />
  );
};

export default SunEarthMoonMap;
