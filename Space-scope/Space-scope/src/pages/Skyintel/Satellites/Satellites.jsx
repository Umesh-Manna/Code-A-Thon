import { useEffect, useState } from "react";

/* Sidebar */
// import Sidebar from "../../../components/Sidebar";
import Sidebar from '../../../../../src/components/Sidebar';

/* Navbar */
import Navbar from "../../../components/Skyintel/Navbar/Navbar";

/* Components */
import SatelliteList from "../../../components/Skyintel/Satellites/SatelliteList";
import SatelliteMap from "../../../components/Skyintel/Satellites/SatelliteMap";
import SatelliteDetails from "../../../components/Skyintel/Satellites/SatelliteDetails";
import UserLocation from "../../../components/Skyintel/Satellites/UserLocation";
import MapControls from "../../../components/Skyintel/Satellites/MapControls";

/* API */
import { getLiveSatellitePosition } from "../../../services/satelliteApi";

/* Math */
import {
  calculateAzimuthElevation,
  getSatellitePeriod,
} from "../../../utils/Skyintel/orbitMath";

/* Styles */
import "../../../styles/Skyintel/layout.css";
import "../../../styles/Skyintel/map.css";
import "../../../styles/Skyintel/tables.css";

export default function Satellites() {
  const [satellites] = useState([
    { name: "ISS (ZARYA)", noradId: 25544 },
    { name: "Hubble Space Telescope", noradId: 20580 },
  ]);

  const [selectedSatellites, setSelectedSatellites] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const [mapOptions, setMapOptions] = useState({
    drawOrbits: true,
    drawFootprint: false,
    keepCentered: true,
    largeView: false,
  });

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setUserLocation(null)
    );
  }, []);

  useEffect(() => {
    if (selectedSatellites.length === 0) return;

    let intervalId;

    const updateSatellites = async () => {
      const updated = await Promise.all(
        selectedSatellites.map(async (sat) => {
          const position = await getLiveSatellitePosition(sat.noradId);
          if (!position || !userLocation) return sat;

          const { azimuth, elevation } =
            calculateAzimuthElevation(
              position.lat,
              position.lng,
              position.alt,
              userLocation.lat,
              userLocation.lng
            );

          return {
            ...sat,
            position,
            azimuth,
            elevation,
            period: getSatellitePeriod(sat.noradId),
          };
        })
      );

      setSelectedSatellites(updated);
    };

    updateSatellites();
    intervalId = setInterval(updateSatellites, 5000);

    return () => clearInterval(intervalId);
  }, [userLocation, selectedSatellites.map(s => s.noradId).join(",")]);

  const handleSatelliteToggle = (satellite) => {
    setSelectedSatellites((prev) =>
      prev.some((s) => s.noradId === satellite.noradId)
        ? prev.filter((s) => s.noradId !== satellite.noradId)
        : [...prev, satellite]
    );
  };

  const handleMapOptionChange = (option) => {
    setMapOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const focusSatellite =
    selectedSatellites[selectedSatellites.length - 1] || null;

  return (
    <div className="skyintel-layout">
      {/* SIDEBAR */}
      <aside className="skyintel-sidebar-area">
        <div className="skyintel-sidebar-content">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>
      </aside>

      {/* NAVBAR */}
      <nav className="skyintel-navbar-area">
        <Navbar />
      </nav>

      {/* SCROLLABLE MAIN */}
      <main className="skyintel-scroll-area">
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
          </div>
        </div>
      </main>
    </div>
  );
}
