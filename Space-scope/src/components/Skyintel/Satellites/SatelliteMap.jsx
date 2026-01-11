import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/*
  Props:
  - satellite: selected satellite object (null initially)
  - options: {
      drawOrbits,
      drawFootprint,
      keepCentered,
      largeView
    }
*/

export default function SatelliteMap({ satellite, options }) {
  /* ======================
     Defaults
     ====================== */
  const defaultCenter = [20, 0]; // Equator-centered global view
  const defaultZoom = 2;

  /* ======================
     Satellite Position (stub)
     ====================== */
  const satellitePosition = satellite?.position
    ? [satellite.position.lat, satellite.position.lng]
    : null;

  return (
    <div className={`satellite-map ${options.largeView ? "large" : ""}`}>
      <MapContainer
        center={satellitePosition || defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="leaflet-map"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Satellite Marker */}
        {satellitePosition && (
          <Marker position={satellitePosition} />
        )}
      </MapContainer>

      {/* Overlay Data (Top-left HUD) */}
      <div className="map-overlay">
        <div>LAT: {satellite?.position?.lat ?? "—"}</div>
        <div>LNG: {satellite?.position?.lng ?? "—"}</div>
        <div>ALT (km): {satellite?.position?.alt ?? "—"}</div>
        <div>SPD (km/s): {satellite?.position?.speed ?? "—"}</div>
      </div>
    </div>
  );
}
