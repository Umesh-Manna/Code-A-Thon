import { useState } from 'react';
import styles from '../components/Skywatch.module.css';
import Sidebar from '../components/Sidebar';
import Skywatch_nav from '../components/Skywatch_nav';

const Skywatch = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      {/* 1. Sidebar */}
      <aside className={styles.sidebarArea}>
        <div className={`${styles.sidebarContent} ${isExpanded ? styles.sidebarExpanded : ''}`}>
          <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
        </div>
      </aside>

      {/* 2. Navbar */}
      <nav className={styles.navbarArea}>
        <Skywatch_nav />
      </nav>

      {/* 3. Info Section (Hurricanes Description) */}
      <section className={`${styles.cell} ${styles.infoArea}`}>
        <h1 className="text-2xl font-bold text-blue-400 mb-4">Hurricanes</h1>
        <p className="text-gray-300 leading-relaxed max-w-4xl">
          NOAA's geostationary and polar-orbiting satellites provide vital information for monitoring and 
          forecasting hurricanes and tropical weather that threaten our lives and property[cite: 23]. 
          By imaging a storm as often as every 30 seconds, these satellites help forecasters more easily 
          discern the movement of cloud features and provide greater confidence in estimating intensity[cite: 25].
        </p>
      </section>

      {/* 4. Cards Section (Hurricane Trackers) */}
      <section className={styles.cardsArea}>
        <div className={styles.cardGrid}>
          {/* Card 1: Live Tracker */}
          <div className={styles.cardItem}>
            <h3>Live Hurricane Tracker</h3>
            <p>See current tropical activity and interact with NOAA satellite imagery[cite: 34, 35].</p>
            <span className={styles.cardLink}>Live Tracker →</span>
          </div>

          {/* Card 2: Atlantic */}
          <div className={styles.cardItem}>
            <h3>Atlantic Hurricanes</h3>
            <p>View paths of previous hurricanes and tropical storms from this season[cite: 38].</p>
            <span className={styles.cardLink}>Atlantic Tracker →</span>
          </div>

          {/* Card 3: Pacific */}
          <div className={styles.cardItem}>
            <h3>Pacific Hurricanes</h3>
            <p>Uses NHC data and NOAA imagery to track previous tropical storms[cite: 41].</p>
            <span className={styles.cardLink}>Pacific Tracker →</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skywatch;