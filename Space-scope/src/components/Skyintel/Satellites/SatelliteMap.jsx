import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import { calculateFootprintRadius } from "../../../utils/Skyintel/orbitMath";

function AutoCenter({ position, enabled }) {
  const map = useMap();

  useEffect(() => {
    if (enabled && position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, enabled, map]);

  return null;
}

export default function SatelliteMap({ satellite, options }) {
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  const satellitePosition = satellite?.position
    ? [satellite.position.lat, satellite.position.lng]
    : null;

  const footprintRadius =
    options.drawFootprint && satellite?.position?.alt
      ? calculateFootprintRadius(satellite.position.alt)
      : 0;

  return (
    <div className={`satellite-map ${options.largeView ? "large" : ""}`}>
      <MapContainer
        center={satellitePosition || defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {satellitePosition && (
          <>
            <Marker position={satellitePosition} />

            {options.drawFootprint && footprintRadius > 0 && (
              <Circle
                center={satellitePosition}
                radius={footprintRadius}
                className="footprint-circle"
              />
            )}

            <AutoCenter
              position={satellitePosition}
              enabled={options.keepCentered}
            />
          </>
        )}
      </MapContainer>

      <div className="map-overlay">
        <div>LAT: {satellite?.position?.lat ?? "—"}</div>
        <div>LNG: {satellite?.position?.lng ?? "—"}</div>
        <div>ALT (km): {satellite?.position?.alt ?? "—"}</div>
        <div>SPD (km/s): {satellite?.position?.speed ?? "—"}</div>
      </div>
    </div>
  );
}
