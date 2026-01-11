/*
  Props:
  - satellites: Array of satellite objects
  - selectedSatellite: currently selected satellite
  - onSelect: function(satellite)
*/

export default function SatelliteList({
  satellites = [],
  selectedSatellite,
  onSelect,
}) {
  return (
    <div className="satellite-list">

      <h3 className="panel-title">Satellites</h3>

      <div className="satellite-list-scroll">
        {satellites.length === 0 && (
          <div className="empty-state">
            No satellites available
          </div>
        )}

        {satellites.map((sat) => (
          <div
            key={sat.noradId}
            className={`satellite-item ${
              selectedSatellite?.noradId === sat.noradId
                ? "active"
                : ""
            }`}
            onClick={() => onSelect(sat)}
          >
            <div className="satellite-name">{sat.name}</div>
            <div className="satellite-meta">
              NORAD {sat.noradId}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
