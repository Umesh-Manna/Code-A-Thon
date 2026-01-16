// src/utils/Skyintel/orbitMath.js

const EARTH_RADIUS_KM = 6371;

const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;

/* ======================================================
   Footprint Radius (USED BY SatelliteMap.jsx)
   ====================================================== */
export function calculateFootprintRadius(altitudeKm) {
  if (altitudeKm == null) return 0;

  const centralAngle = Math.acos(
    EARTH_RADIUS_KM / (EARTH_RADIUS_KM + altitudeKm)
  );

  return EARTH_RADIUS_KM * centralAngle * 1000; // meters
}

/* ======================================================
   Azimuth & Elevation (Observer-relative)
   ====================================================== */
export function calculateAzimuthElevation(
  satLat,
  satLng,
  satAltKm,
  obsLat,
  obsLng
) {
  if (
    satLat == null ||
    satLng == null ||
    satAltKm == null ||
    obsLat == null ||
    obsLng == null
  ) {
    return { azimuth: null, elevation: null };
  }

  const φs = toRad(satLat);
  const λs = toRad(satLng);
  const φo = toRad(obsLat);
  const λo = toRad(obsLng);

  const rs = EARTH_RADIUS_KM + satAltKm;
  const ro = EARTH_RADIUS_KM;

  // Satellite ECEF
  const xs = rs * Math.cos(φs) * Math.cos(λs);
  const ys = rs * Math.cos(φs) * Math.sin(λs);
  const zs = rs * Math.sin(φs);

  // Observer ECEF
  const xo = ro * Math.cos(φo) * Math.cos(λo);
  const yo = ro * Math.cos(φo) * Math.sin(λo);
  const zo = ro * Math.sin(φo);

  const rx = xs - xo;
  const ry = ys - yo;
  const rz = zs - zo;

  const sinLat = Math.sin(φo);
  const cosLat = Math.cos(φo);
  const sinLon = Math.sin(λo);
  const cosLon = Math.cos(λo);

  const east = -sinLon * rx + cosLon * ry;
  const north =
    -sinLat * cosLon * rx -
    sinLat * sinLon * ry +
    cosLat * rz;
  const up =
    cosLat * cosLon * rx +
    cosLat * sinLon * ry +
    sinLat * rz;

  const azimuth = (toDeg(Math.atan2(east, north)) + 360) % 360;
  const elevation = toDeg(
    Math.atan2(up, Math.sqrt(east * east + north * north))
  );

  return {
    azimuth: `${azimuth.toFixed(1)}°`,
    elevation: `${elevation.toFixed(1)}°`,
  };
}

/* ======================================================
   Satellite Period (static, stable)
   ====================================================== */
export function getSatellitePeriod(noradId) {
  if (noradId === 25544) return "92.68 min"; // ISS
  return "—";
}

/* ======================================================
   Orbit Ground Track (visual approximation)
   ====================================================== */
export function generateOrbitTrack(lat, lng, points = 90) {
  if (lat == null || lng == null) return [];

  const track = [];
  const step = 360 / points;

  for (let i = -points / 2; i <= points / 2; i++) {
    let newLng = lng + i * step;

    if (newLng > 180) newLng -= 360;
    if (newLng < -180) newLng += 360;

    track.push([lat, newLng]);
  }

  return track;
}
