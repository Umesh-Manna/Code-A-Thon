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

/* Optical */
import hero_banner_optical from '../../assets/SKY_WATCH/Optical/hero_banner.webp';
import para_img_optical from '../../assets/SKY_WATCH/Optical/para_img.webp';
import card1_optical from '../../assets/SKY_WATCH/Optical/card1.webp';
import card2_optical from '../../assets/SKY_WATCH/Optical/card2.webp';
import card3_optical from '../../assets/SKY_WATCH/Optical/card3.webp';
import card4_optical from '../../assets/SKY_WATCH/Optical/card4.webp';

/* Space Weather */
import hero_banner_weather from '../../assets/SKY_WATCH/Weather/hero_banner.webp';
import para_img_weather from '../../assets/SKY_WATCH/Weather/para_img.webp';
import card1_weather from '../../assets/SKY_WATCH/Weather/card1.webp';
import card2_weather from '../../assets/SKY_WATCH/Weather/card2.webp';
import card3_weather from '../../assets/SKY_WATCH/Weather/card3.webp';
import card4_weather from '../../assets/SKY_WATCH/Weather/card4.webp';
import card5_weather from '../../assets/SKY_WATCH/Weather/card5.webp';
import card6_weather from '../../assets/SKY_WATCH/Weather/card6.webp';

const Our_environment = () => {
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
        {/* ================= CLIMATE ================= */}
        <div className={styles.sectionWrapper}>
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${hero_banner})` }}
          >
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Climate</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                NOAA satellites collect information about the land, oceans, and
                atmosphere to understand Earth’s long-term climate.
              </p>
              <p>
                They monitor greenhouse gases, vegetation, ice cover, flooding,
                and ocean conditions.
              </p>
            </div>

            <div className={styles.infoImageWrapper}>
              <img src={para_img} alt="Climate data" />
            </div>
          </section>

          <h2 className={styles.appsTitle}>Articles on Climate</h2>

          <div className={styles.cardGrid}>
            {[card1, card2].map((img, i) => (
              <div key={i} className={styles.cardItem}>
                <div className={styles.cardImageWrapper}>
                  <img src={img} alt="" />
                </div>
                <h3>{i === 0 ? 'Monitoring Drought' : 'Changing Waters'}</h3>
                <span className={styles.cardLink}>READ →</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CLOUDS ================= */}
        <div className={styles.sectionWrapper}>
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${hero_banner_cloud})` }}
          >
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Clouds</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                Clouds form from condensed water vapor or ice crystals in the
                atmosphere.
              </p>
            </div>

            <div className={styles.infoImageWrapper}>
              <img src={para_img_cloud} alt="Cloud imagery" />
            </div>
          </section>

          <div className={styles.cardGrid}>
            {[card1_cloud, card2_cloud, card3_cloud].map((img, i) => (
              <div key={i} className={styles.cardItem}>
                <div className={styles.cardImageWrapper}>
                  <img src={img} alt="" />
                </div>
                <h3>Cloud Type</h3>
                <span className={styles.cardLink}>Learn more →</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= OPTICAL ================= */}
        <div className={styles.sectionWrapper}>
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${hero_banner_optical})` }}
          >
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Optical Phenomena</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                Optical phenomena occur due to interactions between sunlight,
                Earth, oceans, and the Moon.
              </p>
            </div>

            <div className={styles.infoImageWrapper}>
              <img src={para_img_optical} alt="Optical phenomenon" />
            </div>
          </section>

          <div className={styles.cardGrid}>
            {[card1_optical, card2_optical, card3_optical, card4_optical].map(
              (img, i) => (
                <div key={i} className={styles.cardItem}>
                  <div className={styles.cardImageWrapper}>
                    <img src={img} alt="" />
                  </div>
                  <h3>Optical Event</h3>
                  <span className={styles.cardLink}>Learn more →</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ================= SPACE WEATHER ================= */}
        <div className={styles.sectionWrapper}>
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${hero_banner_weather})` }}
          >
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>Space Weather</h1>
          </section>

          <section className={styles.infoGrid}>
            <div className={styles.infoText}>
              <p>
                Space weather refers to solar activity that affects Earth and
                near-Earth space.
              </p>
            </div>

            <div className={styles.infoImageWrapper}>
              <img src={para_img_weather} alt="Space weather" />
            </div>
          </section>

          <div className={styles.cardGrid}>
            {[card1_weather, card2_weather, card3_weather, card4_weather, card5_weather, card6_weather].map(
              (img, i) => (
                <div key={i} className={styles.cardItem}>
                  <div className={styles.cardImageWrapper}>
                    <img src={img} alt="" />
                  </div>
                  <h3>Space Weather Topic</h3>
                  <span className={styles.cardLink}>Learn more →</span>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Our_environment;
