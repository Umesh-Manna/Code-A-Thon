import { useState } from 'react';
import styles from '../components/Skywatch.module.css';
import Sidebar from '../components/Sidebar';
import Skywatch_nav from '../components/Skywatch_nav';

const Skywatch = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebarArea}>
        <div className={`${styles.sidebarContent} ${isExpanded ? styles.sidebarExpanded : ''}`}>
          <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
        </div>
      </aside>

      <nav className={styles.navbarArea}>
        <Skywatch_nav />
      </nav>

      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <h1 className={styles.heroTitle}>Hurricanes</h1>
      </section>

      <section className={styles.infoArea}>
        <p className="text-gray-300 leading-relaxed max-w-4xl">
          NOAA's geostationary and polar-orbiting satellites provide vital information for monitoring and 
          forecasting hurricanes and tropical weather that threaten our lives and property[cite: 2]. By imaging 
          a storm as often as every 30 seconds, these satellites help forecasters more easily discern movement 
          and provide greater confidence in estimating intensity[cite: 4].
        </p>
      </section>

      <section className={styles.cardsArea}>
        <div className={styles.cardGrid}>
          <div className={styles.cardItem}>
            <h3 className="text-blue-400 font-semibold mb-2">Live Hurricane Tracker</h3>
            <p className="text-gray-400 text-sm">See current tropical activity and interact with NOAA satellite imagery[cite: 12, 13].</p>
            <span className="text-blue-500 mt-auto text-sm">Live Tracker →</span>
          </div>
          <div className={styles.cardItem}>
            <h3 className="text-blue-400 font-semibold mb-2">Atlantic Hurricanes</h3>
            <p className="text-gray-400 text-sm">View paths of previous hurricanes and tropical storms from this season[cite: 16, 17].</p>
            <span className="text-blue-500 mt-auto text-sm">Atlantic Tracker →</span>
          </div>
          <div className={styles.cardItem}>
            <h3 className="text-blue-400 font-semibold mb-2">Pacific Hurricanes</h3>
            <p className="text-gray-400 text-sm">Uses NHC data and NOAA imagery to track previous tropical storms[cite: 19, 20].</p>
            <span className="text-blue-500 mt-auto text-sm">Pacific Tracker →</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skywatch;