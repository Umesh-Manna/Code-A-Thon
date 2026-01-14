import { useEffect, useState } from "react";

/* Components */
import SatelliteList from "../../../components/Skyintel/Satellites/SatelliteList";
import SatelliteMap from "../../../components/Skyintel/Satellites/SatelliteMap";
import SatelliteDetails from "../../../components/Skyintel/Satellites/SatelliteDetails";
import UserLocation from "../../../components/Skyintel/Satellites/UserLocation";
import MapControls from "../../../components/Skyintel/Satellites/MapControls";

/* API */
import { getLiveSatellitePosition } from "../../../services/satelliteApi";

/* Styles */
import "../../../styles/Skyintel/layout.css";
import "../../../styles/Skyintel/map.css";
import "../../../styles/Skyintel/tables.css";

export default function Satellites() {
  /* ======================
     Satellites (stub list)
     ====================== */
  const [satellites] = useState([
    {
      name: "ISS (ZARYA)",
      noradId: 25544,
    },
    {
      name: "Hubble Space Telescope",
      noradId: 20580,
    },
  ]);

  const [selectedSatellite, setSelectedSatellite] = useState(null);

  const [mapOptions, setMapOptions] = useState({
    drawOrbits: true,
    drawFootprint: false,
    keepCentered: true,
    largeView: false,
  });

  /* ======================
     Live Position Polling
     ====================== */
  useEffect(() => {
    if (!selectedSatellite?.noradId) return;

    let intervalId;

    const fetchPosition = async () => {
      const position = await getLiveSatellitePosition(
        selectedSatellite.noradId
      );

      if (!position) return;

      setSelectedSatellite((prev) => ({
        ...prev,
        position,
      }));
    };

    fetchPosition();
    intervalId = setInterval(fetchPosition, 5000);

    return () => clearInterval(intervalId);
  }, [selectedSatellite?.noradId]);

  /* ======================
     Handlers
     ====================== */
  const handleSatelliteSelect = (satellite) => {
    setSelectedSatellite(satellite);
  };

  const handleMapOptionChange = (option) => {
    setMapOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  /* ======================
     Render
     ====================== */
  return (
    <div className="skyintel-page">
      <div className="filters-bar">
        <div className="filters-left">
          <span className="filter-label">Search by →</span>
          <select><option>Launched date</option></select>
          <select><option>Satellites</option></select>
          <select><option>Country</option></select>
        </div>

        <div className="filters-right">
          <span className="toggle-label">Night</span>
          <span className="toggle-label active">SATELLITES</span>
          <span className="toggle-label">Light</span>
        </div>
      </div>

      <div className="main-content">
        <div className="map-section">
          <SatelliteMap
            satellite={selectedSatellite}
            options={mapOptions}
          />

          <MapControls
            options={mapOptions}
            onToggle={handleMapOptionChange}
          />

          <SatelliteList
            satellites={satellites}
            selectedSatellite={selectedSatellite}
            onSelect={handleSatelliteSelect}
          />
        </div>

        <div className="info-section">
          <SatelliteDetails satellite={selectedSatellite} />
          <UserLocation />

          <div className="resources-panel">
            <h3>Resources</h3>
            <ul>
              <li>IP2Location IP Geolocation</li>
              <li>Find your Magnetic Declination</li>
              <li>Space Station HD Live!</li>
              <li>Last Minute Stuff!</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="extra-description">
        <h2>Extra Description</h2>
      </div>
    </div>
  );
}
