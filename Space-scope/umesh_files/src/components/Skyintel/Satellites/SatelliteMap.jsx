import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import {
  calculateFootprintRadius,
  generateOrbitTrack,
} from "../../../utils/Skyintel/orbitMath";

function AutoCenter({ position, enabled }) {
  const map = useMap();

  useEffect(() => {
    if (enabled && position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, enabled, map]);

  return null;
}

export default function SatelliteMap({
  satellites = [],
  focusSatellite,
  options,
}) {
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  const focusPosition = focusSatellite?.position
    ? [focusSatellite.position.lat, focusSatellite.position.lng]
    : null;

  return (
    <div className={`satellite-map ${options.largeView ? "large" : ""}`}>
      <MapContainer
        center={focusPosition || defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {satellites.map((sat) => {
          if (!sat.position) return null;

          const position = [
            sat.position.lat,
            sat.position.lng,
          ];

          const footprintRadius =
            options.drawFootprint && sat.position.alt
              ? calculateFootprintRadius(sat.position.alt)
              : 0;

          const orbitTrack =
            options.drawOrbits
              ? generateOrbitTrack(
                  sat.position.lat,
                  sat.position.lng
                )
              : [];

          return (
            <div key={sat.noradId}>
              {/* Satellite Marker */}
              <Marker position={position} />

              {/* Footprint */}
              {options.drawFootprint && footprintRadius > 0 && (
                <Circle
                  center={position}
                  radius={footprintRadius}
                  className="footprint-circle"
                />
              )}

              {/* Orbit Ground Track */}
              {options.drawOrbits && orbitTrack.length > 0 && (
                <Polyline
                  positions={orbitTrack}
                  className="orbit-line"
                />
              )}
            </div>
          );
        })}

        {focusPosition && (
          <AutoCenter
            position={focusPosition}
            enabled={options.keepCentered}
          />
        )}
      </MapContainer>

      <div className="map-overlay">
        <div>
          LAT: {focusSatellite?.position?.lat ?? "—"}
        </div>
        <div>
          LNG: {focusSatellite?.position?.lng ?? "—"}
        </div>
        <div>
          ALT (km): {focusSatellite?.position?.alt ?? "—"}
        </div>
        <div>
          SPD (km/s): {focusSatellite?.position?.speed ?? "—"}
        </div>
      </div>
    </div>
  );
}
