import { useState } from 'react';
import styles from '../../components/Hurricanes.module.css';
import Sidebar from '../../components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

// Images
import hero_banner from '../../assets/SKY_WATCH/Hurricane/hero_banner.webp';
import para_img from '../../assets/SKY_WATCH/Hurricane/para_img.webp';
import card1 from '../../assets/SKY_WATCH/Hurricane/card1.webp';
import card2 from '../../assets/SKY_WATCH/Hurricane/card2.webp';
import card3 from '../../assets/SKY_WATCH/Hurricane/card3.webp';

const Hurricanes = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </aside>

      {/* NAVBAR */}
      <nav className={styles.navbarArea}>
        <Skywatch_nav />
      </nav>

      {/* MAIN CONTENT */}
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
                NOAA’s geostationary and polar-orbiting satellites provide vital
                information for monitoring and forecasting hurricanes.
              </p>
              <p>
                These satellites enable real-time tracking and environmental
                analysis of tropical cyclones.
              </p>
            </div>

            <div className={styles.infoImage}>
              <img src={para_img} alt="Hurricane satellite view" />
            </div>
          </section>

          <div className={styles.sectionDivider}></div>

          {/* APPLICATIONS */}
          <h2 className={styles.appsTitle}>Hurricane Applications</h2>

          <div className={styles.cardGrid}>
            {/* CARD 1 */}
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={card1} alt="Live Hurricane Tracker" />
              </div>
              <h3>Live Hurricane Tracker</h3>
              <p>
                See current tropical activity and interact with NOAA satellite
                imagery while accessing National Hurricane Center data.
              </p>
              <button className={styles.cardButton}>
                Live Hurricane Tracker →
              </button>
            </div>

            {/* CARD 2 */}
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={card2} alt="Atlantic Hurricanes" />
              </div>
              <h3>Atlantic Hurricanes</h3>
              <p>
                View paths of previous hurricanes and tropical storms from this
                season using NOAA and NHC data.
              </p>
              <button className={styles.cardButton}>
                Atlantic Hurricanes →
              </button>
            </div>

            {/* CARD 3 */}
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={card3} alt="Pacific Hurricanes" />
              </div>
              <h3>Pacific Hurricanes</h3>
              <p>
                Track Pacific hurricanes and tropical storms using satellite
                imagery and historical data.
              </p>
              <button className={styles.cardButton}>
                Pacific Hurricanes →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hurricanes;
