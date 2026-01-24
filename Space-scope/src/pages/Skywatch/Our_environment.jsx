import { useState } from 'react';
import styles from '../../components/Our_environment.module.css';
import Sidebar from '../../components/Sidebar';
import Skywatch_nav from '../../components/Skywatch_nav';

/* Climate */
import hero_banner from '../../assets/SKY_WATCH/Climate/hero_banner.webp';
import para_img from '../../assets/SKY_WATCH/Climate/para_img.webp';
import card1 from '../../assets/SKY_WATCH/Climate/card1.webp';
import card2 from '../../assets/SKY_WATCH/Climate/card2.webp'; 

/* Clouds */
import hero_banner_cloud from '../../assets/SKY_WATCH/Cloud/hero_banner.webp';
import para_img_cloud from '../../assets/SKY_WATCH/Cloud/para_img.webp';
import card1_cloud from '../../assets/SKY_WATCH/Cloud/card1.webp';
import card2_cloud from '../../assets/SKY_WATCH/Cloud/card2.webp';
import card3_cloud from '../../assets/SKY_WATCH/Cloud/card3.webp';
import card4_cloud from '../../assets/SKY_WATCH/Cloud/card4.gif';
import card5_cloud from '../../assets/SKY_WATCH/Cloud/card5.gif';
import card6_cloud from '../../assets/SKY_WATCH/Cloud/card6.webp';
import card7_cloud from '../../assets/SKY_WATCH/Cloud/card7.webp';

/* Optical Phenomena */
import hero_banner_optical from '../../assets/SKY_WATCH/Optical/hero_banner.webp';
import para_img_optical from '../../assets/SKY_WATCH/Optical/para_img.webp'
import card1_optical from '../../assets/SKY_WATCH/Optical/card1.webp'
import card2_optical from '../../assets/SKY_WATCH/Optical/card2.webp'
import card3_optical from '../../assets/SKY_WATCH/Optical/card3.webp'
import card4_optical from '../../assets/SKY_WATCH/Optical/card4.webp'

/* Space Weather */ 
import hero_banner_weather from '../../assets/SKY_WATCH/Weather/hero_banner.webp' 
import para_img_weather from '../../assets/SKY_WATCH/Weather/para_img.webp'
import card1_weather from '../../assets/SKY_WATCH/Weather/card1.webp'
import card2_weather from '../../assets/SKY_WATCH/Weather/card2.webp'
import card3_weather from '../../assets/SKY_WATCH/Weather/card3.webp'
import card4_weather from '../../assets/SKY_WATCH/Weather/card4.webp'
import card5_weather from '../../assets/SKY_WATCH/Weather/card5.webp'
import card6_weather from '../../assets/SKY_WATCH/Weather/card6.webp'


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
            <div className={styles.heroOverlay}>
              <img src={hero_banner} alt="Hurricane satellite imagery" />
            </div>
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
              <img src={para_img} alt="Hurricane satellite imagery" />
            </div>
          </section>

          <h2 className={styles.appsTitle}>Articles on Climate</h2>

          <div className={styles.cardGrid}>
            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                <img src={card1} alt="Hurricane satellite imagery" />
              </div>
              <h3>The Value of the Data: Monitoring Drought</h3>
              <p>September 24, 2019</p>
              <span className={styles.cardLink}>READ →</span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                <img src={card2} alt="Hurricane satellite imagery" />
              </div>
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
            <div className={styles.heroOverlay}>
              <img src={hero_banner_cloud} alt="Hurricane satellite imagery" />
            </div>
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
              <img src={para_img_cloud} alt="Hurricane satellite imagery" />
            </div>
          </section>

          <h2 className={styles.appsTitle}>Common Cloud Types</h2>

          <div className={styles.cardGrid}>
            {[
              [card1_cloud,'Marine stratocumulus'],
              [card2_cloud,'Wave clouds'],
              [card3_cloud,'Rope Clouds'],
              [card3_cloud,'Fallstreak clouds'],
              [card3_cloud,'von Kármán vortices'],
              [card3_cloud,'Cloud streets'],
              [card3_cloud,'Ship tracks'],
            ].map(([img, title], index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}>
                  <img src={img} alt="Hurricane satellite imagery" />
                </div>
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
            <div className={styles.heroOverlay}>
              <img src={hero_banner_optical} alt="" />
            </div>
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
              <img src={para_img_optical} alt="" />
            </div>
          </section>

          <h2 className={styles.appsTitle}>
            Common types of Optical Phenomena
          </h2>

          <div className={styles.cardGrid}>
            {[
              [card1_optical,'Solar Eclipse'],
              [card2_optical,'Changing of the Seasons'],
              [card3_optical,'Sunrise and Sunset'],
              [card4_optical, 'Sunglint'],
            ].map(([img,title], index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}>
                  <img src={img} alt="" />
                </div>
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
            <div className={styles.heroOverlay}>
              <img src={hero_banner_weather} alt="" />
            </div>
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
              <img src={para_img_weather} alt="" />
            </div>
          </section>

          {/* -------- Common Types -------- */}
          <h2 className={styles.appsTitle}>Common Types</h2>

          <div className={styles.cardGrid}>
            {[
              [card1_weather,'Sunspots and the Solar Cycle'],
              [card2_weather,'Solar Flares'],
              [card3_weather,'Solar Wind, Geomagnetic Storms, and Coronal Mass Ejections'],
            ].map(([img,title], index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardImagePlaceholder}>
                  <img src={img} alt="" />
                </div>
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
                <img src={card4_weather} alt="" />
              </div>
              <h3>Lagrange Points: An Orbital Parking Spot for Satellites</h3>
              <span className={styles.cardLink}>Lagrange Points →</span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                <img src={card5_weather} alt="" />
              </div>
              <h3>
                SUVI Instrument on Board NOAA's GOES-16 Sends First Solar Images
              </h3>
              <span className={styles.cardLink}>More on SUVI →</span>
            </div>

            <div className={styles.cardItem}>
              <div className={styles.cardImagePlaceholder}>
                <img src={card6_weather} alt="" />
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
