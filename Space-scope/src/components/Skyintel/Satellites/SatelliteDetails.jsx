export default function SatelliteDetails({ satellite }) {
  return (
    <div className="satellite-details">
      <h3 className="panel-title">
        {satellite?.name || "Space Station"}
      </h3>

      <table className="details-table">
        <tbody>
          <tr>
            <td>NORAD ID</td>
            <td>{satellite?.noradId ?? "—"}</td>
          </tr>

          <tr>
            <td>Local Time</td>
            <td>{new Date().toLocaleTimeString()}</td>
          </tr>

          <tr>
            <td>Azimuth</td>
            <td>{satellite?.azimuth ?? "—"}</td>
          </tr>

          <tr>
            <td>Elevation</td>
            <td>{satellite?.elevation ?? "—"}</td>
          </tr>

          <tr>
            <td>Satellite Period</td>
            <td>{satellite?.period ?? "—"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
