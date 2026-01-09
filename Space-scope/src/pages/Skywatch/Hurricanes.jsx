import { useState } from 'react';
import styles from '../../components/Hurricanes.module.css';
import Sidebar from '../../components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

const Hurricanes = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      {/* ================= SIDEBAR ================= */}
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

      {/* ================= NAVBAR ================= */}
      <nav className={styles.navbarArea}>
        <Skywatch_nav />
      </nav>

       
     {/* ================= SCROLLABLE MAIN CONTENT ================= */}
      <main className={styles.scrollArea}>
        {/* HERO (NOW SCROLLS) */}
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}></div>
          <h1 className={styles.heroTitle}>Hurricanes</h1>
        </section>

        {/* INFO SECTION */}
        <section className={styles.infoGrid}>
          <div className={styles.infoText}>
            <p>
              NOAA’s geostationary and polar-orbiting satellites provide vital
              information for monitoring and forecasting hurricanes and tropical
              weather that threaten our lives and property.
            </p>

            <p>
              Our geostationary satellites continuously view the entire Atlantic
              and eastern/central Pacific hurricane basins to provide real-time
              tracking and monitoring of tropical cyclones as well as the
              environmental conditions that cause them to form.
            </p>

            <p>
              Our polar-orbiting satellites orbit the Earth from pole to pole
              14 times a day, providing full global coverage twice daily. They
              make sophisticated and precise observations of the atmosphere,
              ocean and land.
            </p>

            <p>
              These swirling masses of thunderstorms occur, on average, 14 times
              per year in the Atlantic basin. Early warning can save lives and
              property.
            </p>
          </div>

          {/* IMAGE PLACEHOLDER */}
          <div className={styles.infoImagePlaceholder}>
            <span>Image Placeholder</span>
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

export default Hurricanes;
