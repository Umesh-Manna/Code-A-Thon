import { useState } from 'react';
import styles from '../components/Skywatch.module.css';
import Sidebar from '../components/Sidebar';
import Skywatch_nav from '../components/Skywatch_nav';

const Skywatch_IM = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      {/* SIDEBAR (UNCHANGED) */}
      <aside className={styles.sidebarArea}>
        <div
          className={`${styles.sidebarContent} ${
            isExpanded ? styles.sidebarExpanded : ''
          }`}
        >
          <Sidebar
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </aside>

      {/* NAVBAR (UNCHANGED) */}
      <nav className={styles.navbarArea}>
        <Skywatch_nav />
      </nav>

      {/* ================= SCROLLABLE MAIN CONTENT ================= */}
        <main className={styles.scrollArea}>
          {/* HERO (NOW SCROLLS) */}
          <section className={styles.heroSection}>
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Interactive Maps</h1>
          </section>
  
          {/* INFO SECTION */}
          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                NESDIS collects vast amounts of data from satellites to support NOAA's mission to understand and predict changes in climate, weather, oceans, and coasts, and then share that knowledge and information with others. Applications that utilize Geographic Information Systems (GIS) such as The World in Real-Time, Western Hemisphere, and Global Archive below present data as imagery on models of the earth. Zoom to increase the resolution of the imagery, pan to visit specific places, and click through the menus for further information.
              </p>
  
              <p>
                Scroll back and forth through time using the image sequences found in Visible and Infrared Imagery, Colorized Infrared and Water Vapor Imagery. These simple interfaces allow a focused view of weather development over the continental United States.
              </p>
  
            </div>
  
          </section>
  
          {/* DIVIDER */}
          <div className={styles.sectionDivider}></div>
  
          {/* APPLICATIONS */}
          <section>
            <h2 className={styles.appsTitle}>Hurricane Applications</h2>
  
            <div className={styles.cardGrid}>
              {/* CARD 1 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Live Hurricane Tracker</h3>
                <p>
                  See current tropical activity and interact with NOAA satellite
                  imagery while accessing National Hurricane Center data.
                </p>
                <span className={styles.cardLink}>Live Hurricane Tracker →</span>
              </div>
  
              {/* CARD 2 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Atlantic Hurricanes</h3>
                <p>
                  View paths of previous hurricanes and tropical storms from this
                  season using NOAA and NHC data.
                </p>
                <span className={styles.cardLink}>Atlantic Hurricanes →</span>
              </div>
  
              {/* CARD 3 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Pacific Hurricanes</h3>
                <p>
                  Track Pacific hurricanes and tropical storms using satellite
                  imagery and historical data.
                </p>
                <span className={styles.cardLink}>Pacific Hurricanes →</span>
              </div>
            </div>
          </section>
        </main>
    </div>
  );
};

export default Skywatch_IM;
