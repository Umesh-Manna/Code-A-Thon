/*
  Props:
  - satellites: Array of available satellites
  - selectedSatellites: Array of selected satellites
  - onToggle: function(satellite)
*/

export default function SatelliteList({
  satellites = [],
  selectedSatellites = [],
  onToggle,
}) {
  const isSelected = (noradId) =>
    selectedSatellites.some(
      (s) => s.noradId === noradId
    );

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
              isSelected(sat.noradId) ? "active" : ""
            }`}
            onClick={() => onToggle(sat)}
          >
            <div className="satellite-name">
              {sat.name}
            </div>
            <div className="satellite-meta">
              NORAD {sat.noradId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
