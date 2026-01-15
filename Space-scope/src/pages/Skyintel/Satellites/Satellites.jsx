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
     Available Satellites
     ====================== */
  const [satellites] = useState([
    { name: "ISS (ZARYA)", noradId: 25544 },
    { name: "Hubble Space Telescope", noradId: 20580 },
  ]);

  /* ======================
     Multi-selection State
     ====================== */
  const [selectedSatellites, setSelectedSatellites] = useState([]);

  /* ======================
     Map Options
     ====================== */
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
    if (selectedSatellites.length === 0) return;

    let intervalId;

    const fetchPositions = async () => {
      const updates = await Promise.all(
        selectedSatellites.map(async (sat) => {
          const position = await getLiveSatellitePosition(sat.noradId);
          return position ? { ...sat, position } : sat;
        })
      );

      setSelectedSatellites(updates);
    };

    fetchPositions();
    intervalId = setInterval(fetchPositions, 5000);

    return () => clearInterval(intervalId);
  }, [selectedSatellites.map((s) => s.noradId).join(",")]);

  /* ======================
     Handlers
     ====================== */
  const handleSatelliteToggle = (satellite) => {
    setSelectedSatellites((prev) => {
      const exists = prev.find(
        (s) => s.noradId === satellite.noradId
      );

      if (exists) {
        return prev.filter(
          (s) => s.noradId !== satellite.noradId
        );
      }

      return [...prev, satellite];
    });
  };

  const handleMapOptionChange = (option) => {
    setMapOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  /* ======================
     Focus Satellite
     ====================== */
  const focusSatellite =
    selectedSatellites[selectedSatellites.length - 1] || null;

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
            satellites={selectedSatellites}
            focusSatellite={focusSatellite}
            options={mapOptions}
          />

          <MapControls
            options={mapOptions}
            onToggle={handleMapOptionChange}
          />

          <SatelliteList
            satellites={satellites}
            selectedSatellites={selectedSatellites}
            onToggle={handleSatelliteToggle}
          />
        </div>

        <div className="info-section">
          <SatelliteDetails satellite={focusSatellite} />
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
