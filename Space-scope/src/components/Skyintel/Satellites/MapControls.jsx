/*
  Props:
  - options: {
      drawOrbits,
      drawFootprint,
      keepCentered,
      largeView
    }
  - onToggle: function(optionKey)
*/

export default function MapControls({ options, onToggle }) {
  return (
    <div className="map-controls">

      <label>
        <input
          type="checkbox"
          checked={options.drawOrbits}
          onChange={() => onToggle("drawOrbits")}
        />
        Draw orbits
      </label>

      <label>
        <input
          type="checkbox"
          checked={options.drawFootprint}
          onChange={() => onToggle("drawFootprint")}
        />
        Draw footprint
      </label>

      <label>
        <input
          type="checkbox"
          checked={options.keepCentered}
          onChange={() => onToggle("keepCentered")}
        />
        Keep selection centered
      </label>

      <button onClick={() => onToggle("largeView")}>
        Larger Map View
      </button>

      <div className="map-status">
        The satellite is in daylight
      </div>

    </div>
  );
}
