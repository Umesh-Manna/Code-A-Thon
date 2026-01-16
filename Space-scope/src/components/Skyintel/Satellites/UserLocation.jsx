import { useEffect, useState } from "react";

export default function UserLocation() {
  const [location, setLocation] = useState({
    ip: "—",
    latitude: "—",
    longitude: "—",
    magneticDeclination: "—",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  /* ===============================
     Fetch Public IP
     =============================== */
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setLocation((prev) => ({
          ...prev,
          ip: data.ip,
        }));
      })
      .catch(() => {});
  }, []);

  /* ===============================
     Geolocation (Live)
     =============================== */
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation((prev) => ({
          ...prev,
          latitude: lat.toFixed(5),
          longitude: lng.toFixed(5),
          magneticDeclination: estimateDeclination(lat, lng),
        }));
      },
      () => {},
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="user-location">
      <h3 className="panel-title">Your current location</h3>

      <table className="details-table">
        <tbody>
          <tr>
            <td>Your IP address</td>
            <td>{location.ip}</td>
          </tr>

          <tr>
            <td>Latitude</td>
            <td>{location.latitude}</td>
          </tr>

          <tr>
            <td>Longitude</td>
            <td>{location.longitude}</td>
          </tr>

          <tr>
            <td>Magnetic decl.</td>
            <td>{location.magneticDeclination}</td>
          </tr>

          <tr>
            <td>Local time zone</td>
            <td>{location.timezone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ===============================
   Magnetic Declination (Approx)
   =============================== */
function estimateDeclination(lat, lng) {
  // Very lightweight approximation (degrees)
  const decl = (lng / 180) * 20;
  return `${decl.toFixed(1)}°`;
}
