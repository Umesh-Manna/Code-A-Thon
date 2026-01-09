import { useState } from 'react';
import styles from '../../components/Our_environment.module.css';
import Sidebar from '../../components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

const Our_environment = () => {
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
        {/* ==================================================
            CLIMATE SECTION
        ================================================== */}
        <div className={styles.sectionWrapper}>
          <section className={styles.heroSection}>
            {/* 🔴 CLIMATE HERO IMAGE PLACEHOLDER */}
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Climate</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                NOAA satellites collect information about the land, oceans, and
                atmosphere that help us understand the Earth’s long-term climate.
              </p>
              <p>
                They monitor weather patterns, greenhouse gases, vegetation
                health, polar ice, flooding, ocean acidification, and more.
              </p>
              <p>
                Climate is an area's long-term weather patterns. What is the
                climate like where you live?
              </p>
            </div>

            <div className={styles.infoImagePlaceholder}>
              <span>Image Placeholder</span>
            </div>
          </section>

          <h2 className={styles.appsTitle}>Articles on Climate</h2>

          <div className={styles.cardGrid}>
            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}></div>
              <h3>The Value of the Data: Monitoring Drought</h3>
              <p>September 24, 2019</p>
              <span className={styles.cardLink}>READ →</span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}></div>
              <h3>Changing Waters</h3>
              <p>August 8, 2018</p>
              <span className={styles.cardLink}>READ →</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            CLOUDS SECTION
        ================================================== */}
        <div className={styles.sectionWrapper}>
          <section className={`${styles.heroSection} ${styles.cloudsHero}`}>
            {/* 🔴 CLOUDS HERO IMAGE PLACEHOLDER */}
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Clouds</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                Clouds form from water or ice that has evaporated from Earth’s
                surface and condensed in the atmosphere.
              </p>
              <p>
                All clouds are made of water droplets or ice crystals, but each
                type appears different.
              </p>
              <p>
                There are many types of clouds. NOAA satellites help us study
                them.
              </p>
            </div>

            <div className={styles.infoImagePlaceholder}>
              <span>Image Placeholder</span>
            </div>
          </section>

          <h2 className={styles.appsTitle}>Common Cloud Types</h2>

          <div className={styles.cardGrid}>
            {[
              'Marine stratocumulus',
              'Wave clouds',
              'Rope Clouds',
              'Fallstreak clouds',
              'von Kármán vortices',
              'Cloud streets',
              'Ship tracks',
            ].map((title, index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>{title}</h3>
                <span className={styles.cardLink}>{title} →</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            OPTICAL PHENOMENA SECTION
        ================================================== */}
        <div className={styles.sectionWrapper}>
          <section className={`${styles.heroSection} ${styles.opticalHero}`}>
            {/* 🔴 OPTICAL HERO IMAGE PLACEHOLDER */}
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Optical Phenomena</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                Optical phenomena occur due to interactions between sunlight,
                Earth, oceans, and shadows from the Moon.
              </p>
            </div>

            <div className={styles.infoImagePlaceholder}>
              <span>Image Placeholder</span>
            </div>
          </section>

          <h2 className={styles.appsTitle}>
            Common types of Optical Phenomena
          </h2>

          <div className={styles.cardGrid}>
            {[
              'Solar Eclipse',
              'Changing of the Seasons',
              'Sunrise and Sunset',
              'Sunglint',
            ].map((title, index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>{title}</h3>
                <span className={styles.cardLink}>Learn more →</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            SPACE WEATHER SECTION
        ================================================== */}
        <div className={styles.sectionWrapper}>
          <section className={`${styles.heroSection} ${styles.spaceWeatherHero}`}>
            {/* 🔴 SPACE WEATHER HERO IMAGE PLACEHOLDER */}
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Space Weather</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                NESDIS continuously monitors conditions on the Sun and in the
                space environment around Earth using satellites and ground-based
                instruments.
              </p>
              <p>
                Space weather refers to solar activity that can affect Earth,
                its atmosphere, and near-Earth space.
              </p>
            </div>

            <div className={styles.infoImagePlaceholder}>
              <span>Image Placeholder</span>
            </div>
          </section>

          {/* -------- Common Types -------- */}
          <h2 className={styles.appsTitle}>Common Types</h2>

          <div className={styles.cardGrid}>
            {[
              'Sunspots and the Solar Cycle',
              'Solar Flares',
              'Solar Wind, Geomagnetic Storms, and Coronal Mass Ejections',
            ].map((title, index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>{title}</h3>
                <span className={styles.cardLink}>Learn more →</span>
              </div>
            ))}
          </div>

          {/* -------- Observing the Sun (CHILD SECTION) -------- */}
          <h2 className={styles.appsTitle}>Observing the Sun</h2>

          <div className={styles.cardGrid}>
            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                {/* 🔴 IMAGE PLACEHOLDER */}
              </div>
              <h3>Lagrange Points: An Orbital Parking Spot for Satellites</h3>
              <span className={styles.cardLink}>Lagrange Points →</span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                {/* 🔴 IMAGE PLACEHOLDER */}
              </div>
              <h3>
                SUVI Instrument on Board NOAA's GOES-16 Sends First Solar Images
              </h3>
              <span className={styles.cardLink}>More on SUVI →</span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                {/* 🔴 IMAGE PLACEHOLDER */}
              </div>
              <h3>
                NOAA GOES East Satellite Captures Full Rotation of the Sun
              </h3>
              <span className={styles.cardLink}>The Sun’s Rotation →</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Our_environment;
