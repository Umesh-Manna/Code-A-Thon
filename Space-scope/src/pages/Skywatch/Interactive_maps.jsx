import { useState } from 'react';
import styles from '../../components/Interactive_maps.module.css';
import Sidebar from '../../components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

// Images
import hero_banner from '../../assets/SKY_WATCH/Maps/hero_banner.webp';
import r1c1 from '../../assets/SKY_WATCH/Maps/r1c1.webp';
import r1c2 from '../../assets/SKY_WATCH/Maps/r1c2.webp';
import r1c3 from '../../assets/SKY_WATCH/Maps/r1c3.webp';
import r2c1 from '../../assets/SKY_WATCH/Maps/r2c1.webp';
import r2c2 from '../../assets/SKY_WATCH/Maps/r2c2.webp';
import r2c3 from '../../assets/SKY_WATCH/Maps/r2c3.webp';
import r3c1 from '../../assets/SKY_WATCH/Maps/r3c1.webp';
import r3c2 from '../../assets/SKY_WATCH/Maps/r3c2.webp';

const Interactive_maps = () => {
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
            <h1 className={styles.heroTitle}>Interactive Maps</h1>
          </section>

          {/* INFO */}
          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                NESDIS collects vast amounts of satellite data to support NOAA’s
                mission to understand and predict changes in climate, weather,
                oceans, and coasts.
              </p>
              <p>
                These interactive GIS-based applications allow users to explore,
                zoom, pan, and analyze Earth systems in near real time.
              </p>
            </div>
          </section>

          <div className={styles.sectionDivider}></div>

          {/* MAPS */}
          <h2 className={styles.appsTitle}>Maps</h2>

          <div className={styles.cardGrid}>
            {[
              [r1c1, 'The World in Real-Time', 'Select up-to-the-minute satellite data.', 'Explore interactively →'],
              [r1c2, 'Western Hemisphere', 'GOES GeoColor imagery from the last 24 hours.', 'Animate through time →'],
              [r1c3, 'Global Archive', 'Daylight imagery and multiyear global archives.', 'View Earth’s atmosphere →'],
              [r2c1, 'Visible & Infrared Imagery', 'Day/night continuity over the U.S.', 'Watch storms progress →'],
              [r2c2, 'Colorized Infrared', 'Enhanced imagery highlighting cold cloud tops.', 'Find highest cloud tops →'],
              [r2c3, 'Water Vapor Imagery', 'Atmospheric moisture analysis for forecasting.', 'Track rain intensity →'],
              [r3c1, 'Regions in Real-Time', 'Regional satellite views with scientific data.', 'Explore imagery by region →'],
              [r3c2, 'Atmospheric Aerosols', 'Study airborne particles and layers.', 'See aerosol layers →'],
            ].map(([img, title, desc, link], idx) => (
              <div key={idx} className={styles.cardItem}>
                <div className={styles.cardImageWrapper}>
                  <img src={img} alt={title} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className={styles.cardLink}>{link}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interactive_maps;
