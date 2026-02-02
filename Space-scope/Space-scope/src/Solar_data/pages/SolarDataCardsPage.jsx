import react, { useState } from 'react';
import styles from '../../components/Hurricanes.module.css';
import Sidebar from '../../../../src/components/Sidebar';
import Navbar from "../../components/Skyintel/Navbar/Navbar";

import LatestUltravioletImages from "../sections/LatestUltravioletImages";
import LatestPhotosphereImage from "../sections/LatestPhotosphereImage";
import CurrentSolarActivityOverview from "../sections/CurrentSolarActivityOverview";
import CoronalMassEjection from "../sections/CoronalMassEjection";
import AuroraForecast from "../sections/AuroraForecast";
import SolarWindActivity from "../sections/SolarWindActivity";
import ThreeDaySolarForecast from "../sections/ThreeDaySolarForecast";


import SolarCard from "../components/SolarCard";
import "./SolarDataCardsPage.css";

const SolarDataCardsPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
 <div className="solar-layout">

    {/* ================= SIDEBAR (LOCKED) ================= */}
    <aside className={styles.sidebarArea}>
        <div
          className={`${styles.sidebarContent} ${
            isExpanded ? styles.sidebarExpanded : ''
          }`}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>
      </aside>

    {/* ================= NAVBAR (LOCKED) ================= */}

    <nav className="live-sky-navbar-area">
        <Navbar />
    </nav>


   { /* ================= SCROLLABLE CONTENT ================= */}
    <main className="solar-cards-page">
      {/* Section 1 */}
      <SolarCard>
        <LatestUltravioletImages />
      </SolarCard>

      {/* Section 2 */}
      <SolarCard>
        <LatestPhotosphereImage />
      </SolarCard>

      {/* Section 3 */}
      <SolarCard>
        <CurrentSolarActivityOverview />
      </SolarCard>

      {/* Section 4 */}
      <SolarCard>
        <CoronalMassEjection />
      </SolarCard>

      <SolarCard>
        <AuroraForecast />
      </SolarCard>

      <SolarCard>
        <SolarWindActivity />
      </SolarCard>

      <SolarCard>
        <ThreeDaySolarForecast />
      </SolarCard>
    </main>

  </div>
  );
};

export default SolarDataCardsPage;
