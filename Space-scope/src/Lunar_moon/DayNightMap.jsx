import { useEffect, useRef } from "react";

const DEG2RAD = Math.PI / 180;

// ===============================
// Sun position (subsolar point)
// ===============================
function getSubsolarPoint(date) {
  const utcHours =
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600;

  const lon = 180 - utcHours * 15;

  const dayOfYear =
    (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
      Date.UTC(date.getUTCFullYear(), 0, 0)) /
    86400000;

  const lat =
    -23.44 * Math.cos(((360 / 365) * (dayOfYear + 10)) * DEG2RAD);

  return { lat, lon };
}

// ===============================
// Moon position (sublunar point)
// ===============================
function getSublunarPoint(date) {
  const d =
    (date - new Date(Date.UTC(2000, 0, 1, 12))) / 86400000;

  const L = (218.316 + 13.176396 * d) % 360; // mean longitude
  const M = (134.963 + 13.064993 * d) % 360; // mean anomaly
  const F = (93.272 + 13.229350 * d) % 360; // argument of latitude

  const lon =
    L +
    6.289 * Math.sin(M * DEG2RAD);

  const lat =
    5.128 * Math.sin(F * DEG2RAD);

  // Convert to Earth longitude
  const utcHours =
    date.getUTCHours() +
    date.getUTCMinutes() / 60;

  const earthLon = ((lon - utcHours * 15 + 540) % 360) - 180;

  return { lat, lon: earthLon };
}

// ===============================
// Main component
// ===============================
export default function DayNightMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "/textures/world_map_dark.jpg";

    img.onload = () => {
      const w = canvas.width;
      const h = canvas.height;

      const draw = () => {
        ctx.drawImage(img, 0, 0, w, h);

        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        const now = new Date();
        const sun = getSubsolarPoint(now);
        const moon = getSublunarPoint(now);

        // ---------- Day / Night shading ----------
        for (let y = 0; y < h; y++) {
          const lat = 90 - (y / h) * 180;

          for (let x = 0; x < w; x++) {
            const lon = (x / w) * 360 - 180;

            const cosZ =
              Math.sin(lat * DEG2RAD) *
                Math.sin(sun.lat * DEG2RAD) +
              Math.cos(lat * DEG2RAD) *
                Math.cos(sun.lat * DEG2RAD) *
                Math.cos((lon - sun.lon) * DEG2RAD);

            const illumination = Math.max(0, cosZ);
            const shade = Math.pow(illumination, 0.45);

            const idx = (y * w + x) * 4;
            data[idx] *= shade;
            data[idx + 1] *= shade;
            data[idx + 2] *= shade;
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // ---------- Sun marker ----------
        const sunX = ((sun.lon + 180) / 360) * w;
        const sunY = ((90 - sun.lat) / 180) * h;

        ctx.beginPath();
        ctx.arc(sunX, sunY, 6, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        // ---------- Moon marker ----------
        const moonX = ((moon.lon + 180) / 360) * w;
        const moonY = ((90 - moon.lat) / 180) * h;

        ctx.beginPath();
        ctx.arc(moonX, moonY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ddd";
        ctx.fill();

        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      draw();
      const id = setInterval(draw, 60000);
      return () => clearInterval(id);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={450}
      style={{
        width: "100%",
        borderRadius: "16px",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
    