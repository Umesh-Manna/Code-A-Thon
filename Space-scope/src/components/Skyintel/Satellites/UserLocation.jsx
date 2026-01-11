import { useEffect, useState } from "react";

export default function UserLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ip: "Y",
    magneticDeclination: "Y",
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(4),
          longitude: pos.coords.longitude.toFixed(4),
        }));
      },
      () => {
        /* Permission denied or unavailable */
      }
    );
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
            <td>{location.latitude ?? "Y"}</td>
          </tr>

          <tr>
            <td>Longitude</td>
            <td>{location.longitude ?? "Y"}</td>
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
