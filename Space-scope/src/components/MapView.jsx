import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchHurricanes } from "./hurricaneApi";

/* Color + size by intensity */
function getStormStyle(intensity) {
  if (intensity.includes("Depression"))
    return { color: "#facc15", radius: 6 };

  if (intensity.includes("Storm"))
    return { color: "#fb923c", radius: 7 };

  if (intensity.includes("Category 1") || intensity.includes("Category 2"))
    return { color: "#ef4444", radius: 8 };

  if (
    intensity.includes("Category 3") ||
    intensity.includes("Category 4") ||
    intensity.includes("Category 5")
  )
    return { color: "#a855f7", radius: 9 };

  return { color: "#ffffff", radius: 6 };
}

export default function MapView() {
  const mapRef = useRef(null);
  const layerRef = useRef(L.layerGroup());

  useEffect(() => {
    const map = L.map("map", {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      worldCopyJump: true,
    });

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    layerRef.current.addTo(map);

    const loadStorms = async () => {
      layerRef.current.clearLayers();

      const storms = await fetchHurricanes();

      storms.forEach((storm) => {
        const style = getStormStyle(storm.intensity);

        /* Draw storm track */
        L.polyline(storm.track, {
          color: style.color,
          weight: 2,
          opacity: 0.7,
          dashArray: "4 6",
        }).addTo(layerRef.current);

        /* Current position = last track point */
        const currentPosition =
          storm.track[storm.track.length - 1];

        /* Draw storm marker */
        L.circleMarker(currentPosition, {
          radius: style.radius,
          color: style.color,
          fillColor: style.color,
          fillOpacity: 0.9,
          weight: 1,
        })
          .bindPopup(
            `<strong>${storm.name}</strong><br/>${storm.intensity}`
          )
          .addTo(layerRef.current);
      });
    };

    loadStorms();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Leaflet map container */}
      <div id="map" className="map-container" />

      {/* Legend (always above Leaflet layers) */}
      <div className="legend">
        <div className="legend-title">Storm Intensity</div>

        <div className="legend-item">
          <span className="legend-dot legend-depression"></span>
          Tropical Depression
        </div>

        <div className="legend-item">
          <span className="legend-dot legend-storm"></span>
          Tropical Storm
        </div>

        <div className="legend-item">
          <span className="legend-dot legend-cat12"></span>
          Category 1–2
        </div>

        <div className="legend-item">
          <span className="legend-dot legend-cat35"></span>
          Category 3–5
        </div>
      </div>
    </div>
  );
}
