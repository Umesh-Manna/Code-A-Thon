import { useState } from "react";

/* Components */
import SatelliteList from "../../../components/Skyintel/Satellites/SatelliteList";
import SatelliteMap from "../../../components/Skyintel/Satellites/SatelliteMap";
import SatelliteDetails from "../../../components/Skyintel/Satellites/SatelliteDetails";
import UserLocation from "../../../components/Skyintel/Satellites/UserLocation";
import MapControls from "../../../components/Skyintel/Satellites/MapControls";

/* Styles */
import "../../../styles/Skyintel/layout.css";
import "../../../styles/Skyintel/map.css";
import "../../../styles/Skyintel/tables.css";

export default function Satellites() {
  /* ======================
     Satellites (stub data)
     ====================== */
  const [satellites] = useState([
    {
      name: "ISS (ZARYA)",
      noradId: 25544,
      position: {
        lat: 33.96,
        lng: 125.47,
        alt: 419.22,
        speed: 7.66,
      },
      azimuth: "Y",
      elevation: "Y",
      period: "Y",
    },
    {
      name: "Hubble Space Telescope",
      noradId: 20580,
    },
  ]);

  /* ======================
     Page-level State
     ====================== */
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  const [mapOptions, setMapOptions] = useState({
    drawOrbits: true,
    drawFootprint: false,
    keepCentered: true,
    largeView: false,
  });

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

      {/* ===== Top Filters Bar ===== */}
      <div className="filters-bar">
        <div className="filters-left">
          <span className="filter-label">Search by →</span>

          <select>
            <option>Launched date</option>
          </select>

          <select>
            <option>Satellites</option>
            <option>All</option>
          </select>

          <select>
            <option>Country</option>
            <option>All</option>
          </select>
        </div>

        <div className="filters-right">
          <span className="toggle-label">Night</span>
          <span className="toggle-label active">SATELLITES</span>
          <span className="toggle-label">Light</span>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="main-content">

        {/* ===== Left Column ===== */}
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

        {/* ===== Right Column ===== */}
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

      {/* ===== Extra Description ===== */}
      <div className="extra-description">
        <h2>Extra Description</h2>
      </div>

    </div>
  );
}
