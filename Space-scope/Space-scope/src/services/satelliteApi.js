// src/services/satelliteApi.js

export async function getLiveSatellitePosition(noradId) {
  // ISS-only public endpoint (no API key)
  if (noradId !== 25544) return null;

  const response = await fetch("https://api.open-notify.org/iss-now.json");
  const data = await response.json();

  return {
    lat: parseFloat(data.iss_position.latitude),
    lng: parseFloat(data.iss_position.longitude),
    alt: 420,      // Approximate ISS altitude (km)
    speed: 7.66,   // Approximate ISS speed (km/s)
    timestamp: Date.now(), // 🔑 forces fresh object identity
  };
}
