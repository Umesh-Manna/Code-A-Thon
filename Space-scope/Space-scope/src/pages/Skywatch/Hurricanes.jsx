import react, { useState } from 'react';
import styles from '../../components/Hurricanes.module.css';
// import Sidebar from '../../components/Sidebar';
import Sidebar from '../../../../src/components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

// Images
import hero_banner from '../../assets/SKY_WATCH/Hurricane/hero_banner.webp';
import para_img from '../../assets/SKY_WATCH/Hurricane/para_img.webp';
import card1 from '../../assets/SKY_WATCH/Hurricane/card1.webp';
import card2 from '../../assets/SKY_WATCH/Hurricane/card2.webp';
import card3 from '../../assets/SKY_WATCH/Hurricane/card3.webp';

const Hurricanes = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={styles.container}>
      {/* SIDEBAR */}
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

      {/* NAVBAR */}
      <nav className={styles.navbarArea}>
        <Skywatch_nav />
      </nav>

      {/* SCROLLABLE MAIN CONTENT */}
      <main className={styles.scrollArea}>
        <div className={styles.sectionWrapper}>
          {/* HERO */}
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${hero_banner})` }}
          >
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Hurricanes</h1>
          </section>

          {/* INFO */}
          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                NOAA’s geostationary and polar-orbiting satellites provide vital information for monitoring and forecasting hurricanes and tropical weather that threaten our lives and property.
              </p>
              <p>
                Our geostationary satellites continuously view the entire Atlantic and eastern/central Pacific hurricane basins to provide real-time tracking and monitoring of tropical cyclones as well as the environmental conditions that cause them to form. By imaging a storm as often as every 30 seconds, these satellites help forecasters more easily discern the movement of cloud features and provide greater confidence in estimating the intensity of storms.
              </p>
              <p>
                Our polar-orbiting satellites orbit the Earth from pole to pole 14 times a day, providing full global coverage twice daily. They make sophisticated and precise observations of the atmosphere, ocean and land, which are critical for daily and long-term monitoring and forecasting. 
              </p>
            </div>

            <div className={styles.infoImagePlaceholder}>
              <img src={para_img} alt="Hurricane satellite imagery" />
            </div>
          </section>

          <div className={styles.sectionDivider}></div>

          {/* APPLICATIONS */}
          <h2 className={styles.appsTitle}>Hurricane Applications</h2>

          <div className={styles.cardGrid}>
            <div className={styles.cardItem}>
              <div className={styles.cardImageWrapper}>
                <img src={card1} alt="Live Hurricane Tracker" />
              </div>
              <h3>Live Hurricane Tracker</h3>
              <p>
                The Live Hurricane Tracker allows users to see the current
                tropical activity and interact with NOAA satellite imagery while
                accessing National Hurricane Center data.
              </p>
              <span className={styles.cardLink}>
                Live Hurricane Tracker →
              </span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImageWrapper}>
                <img src={card2} alt="Atlantic Hurricanes" />
              </div>
              <h3>Atlantic Hurricanes</h3>
              <p>
                View paths of previous hurricanes and tropical storms from this
                season using NOAA and NHC data.
              </p>
              <span className={styles.cardLink}>
                Atlantic Hurricanes →
              </span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImageWrapper}>
                <img src={card3} alt="Pacific Hurricanes" />
              </div>
              <h3>Pacific Hurricanes</h3>
              <p>
                Track Pacific hurricanes and tropical storms using satellite
                imagery and historical data.
              </p>
              <span className={styles.cardLink}>
                Pacific Hurricanes →
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hurricanes;
