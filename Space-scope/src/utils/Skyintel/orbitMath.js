// src/utils/Skyintel/orbitMath.js

/**
 * Calculates satellite footprint radius on Earth.
 * @param {number} altitudeKm - Satellite altitude in kilometers
 * @returns {number} radius in meters
 */
export function calculateFootprintRadius(altitudeKm) {
  if (!altitudeKm) return 0;

  const EARTH_RADIUS_KM = 6371;

  // Central angle (radians)
  const centralAngle = Math.acos(
    EARTH_RADIUS_KM / (EARTH_RADIUS_KM + altitudeKm)
  );

  // Arc length on Earth's surface (km → meters)
  return EARTH_RADIUS_KM * centralAngle * 1000;
}
