import { useState } from 'react';
import styles from '../../components/Interactive_maps.module.css';
import Sidebar from '../../components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

const Interactive_maps = () => {
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
            <h2 className={styles.appsTitle}>Maps</h2>
  
            <div className={styles.cardGrid}>
              {/* CARD 1 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>The World in Real-Time</h3>
                <p>
                  Select data from geostationary and polar-orbiting satellites, always up to the minute.
                </p>
                <span className={styles.cardLink}>Explore interactively →</span>
              </div>
  
              {/* CARD 2 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Western Hemisphere</h3>
                <p>
                  GOES GeoColor Imagery of the Western Hemisphere and Pacific Ocean collected over the last 24-hours.
                </p>
                <span className={styles.cardLink}>Animate through time →</span>
              </div>
  
              {/* CARD 3 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Global Archive</h3>
                <p>
                  View latest daylight imagery and multiyear archive over the whole Earth as captured by the JPSS polar satellites.
                </p>
                <span className={styles.cardLink}>View Earth's atmosphere →</span>
              </div>

              {/* CARD 4 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Visible and Infrared Imagery</h3>
                <p>
                  Continental United States from GOES East and West, combining bands 1 and 13 for day/night continuity, over "Blue Marble" data.
                </p>
                <span className={styles.cardLink}>Watch storms progress →</span>
              </div>

              {/* CARD 5 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Colorized Infrared</h3>
                <p>
                  Applying color enhancements to GOES band 13 imagery highlights progressively colder cloud tops, indicating severity of storm development.
                </p>
                <span className={styles.cardLink}>Find highest cloud tops →</span>
              </div>

              {/* CARD 6 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Water Vapor Imagery</h3>
                <p>
                  GOES water vapor band 10 senses moisture content in the atmosphere, a vital component in forecasting rainfall and flooding.
                </p>
                <span className={styles.cardLink}>Track rain intensity →</span>
              </div>

              {/* CARD 7 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Pacific Hurricanes</h3>
                <p>
                  Track Pacific hurricanes and tropical storms using satellite
                  imagery and historical data.
                </p>
                <span className={styles.cardLink}>Pacific Hurricanes →</span>
              </div>

              {/* CARD 8 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Regions in Real-Time</h3>
                <p>
                  The GOES East and GOES West satellites provide up-to-the-minute views of the Western Hemisphere. These regional maps, provided by NESDIS' Center for Satellite Applications and Research (STAR), contain technical information from each satellite channel for scientists.
                </p>
                <span className={styles.cardLink}>Explore imagery by region →</span>
              </div>

              {/* CARD 9 */}
              <div className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}></div>
                <h3>Atmospheric Aerosols</h3>
                <p>
                  There are many different types of particles in the air that NOAA satellites help us study. This map, provided by NESDIS' Center for Satellite Applications and Research (STAR), contains technical information about these particles for scientists.
                </p>
                <span className={styles.cardLink}>See aerosol layers →</span>
              </div>
            </div>
          </section>
        </main>
    </div>
  );
};

export default Interactive_maps;
