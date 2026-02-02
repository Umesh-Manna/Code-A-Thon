import React from 'react';
// import Sidebar from '../../components/Sidebar';
import Sidebar from '../../../../src/components/Sidebar';
import styles from '../../components/Astrolab1.module.css';
import { useState } from 'react';

const cards = [
  {
    title: 'Space Explorers',
    desc: 'Travel beyond Earth!\nDiscover planets, stars, astronauts, and amazing space facts.',
    color: 'blue',
    icons: ['🌑', '🪐', '⚛️'],
  },
  {
    title: 'World Wonder',
    desc: 'Explore our amazing earth\nMountains, Oceans, Earth, Countries and Maps await You.',
    color: 'green',
    icons: ['🗺️', '🏛️', '🌍'],
  },
  {
    title: 'Time Travel',
    desc: 'Stories from past\nLearn about kings, queen, heroes, and ancient times.',
    color: 'purple',
    icons: ['👑', '🦖', '🚀'],
  },
  {
    title: 'Space Science',
    desc: 'How Things Work in Space\nRockets, Satellites, Gravity, invention.',
    color: 'pink',
    icons: ['🛰️', '👨‍🚀', '🚀'],
  },

  /* ✅ NEW CARD */
  {
    title: 'Mix Master Quiz',
    desc: 'A little Bit of Everything\nSpace, Planet, Geography, History, and Science.',
    color: 'yellow',
    icons: ['🛰️', '🧠', '💻'],
  },
];

const Astrolab1 = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);  
  return (
    <div className={styles.container}>
      <aside className={styles.sidebarArea}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </aside>

      <main className={styles.main}>
        <div className={styles.gradientPanel}>

          {/* ================= SECTION 1 ================= */}
          <section className={styles.pageSection}>
            <div className={styles.contentWrap}>

              {/* Header */}
              <div className={styles.topBanner}>
                <div className={styles.headerPill}>
                  <div className={styles.headerBlock}>
                    <strong>Hi, Yugal!</strong>
                    <span>Let’s Start Your Quiz now...</span>
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.headerStat}>
                    🏆
                    <div>
                      <strong>Ranking</strong>
                      <span>348</span>
                    </div>
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.headerStat}>
                    🪙
                    <div>
                      <strong>Points</strong>
                      <span>1209</span>
                    </div>
                  </div>
                </div>

                <button className={styles.leaderboardBtn}>
                  Leaderboard →
                </button>
              </div>

              {/* Play Section */}
              <div className={styles.playSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.explore}>
                    Explore Category →
                  </span>
                </div>

                {/* ✅ Horizontal scrolling stays here */}
                <div className={styles.cardRow}>
                  {cards.map((card, i) => (
                    <div
                      key={i}
                      className={`${styles.card} ${styles[card.color]}`}
                    >
                      <div className={styles.iconTray}>
                        {card.icons.map((icon, idx) => (
                          <span key={idx}>{icon}</span>
                        ))}
                      </div>

                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>

                      <div className={styles.cardFooter}>
                        <span className={styles.badge}>30 Q</span>
                        <button className={styles.playBtn}>
                          ▶ Play
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ================= SECTION 2 ================= */}


          {/* ================= SECTION 3 ================= */}

          <section className={styles.pageSection}>
            <div className={styles.recSection}>
              <div className={styles.recHeader}>
                <h2>Recommended for you.</h2>
                <span>Explore More →</span>
              </div>

              <div className={styles.recRow}>

                <div className={`${styles.recCard} ${styles.greenRec}`}>
                  <div className={styles.recImagePlaceholder}>
                    Image Placeholder
                  </div>
                  <div className={styles.recBody}>
                    <h3>PSLV Reliability</h3>
                    <p>
                      PSLV is known as the “workhorse of ISRO” and has one of the highest
                      success rates globally. In 2017, PSLV launched 104 satellites in a
                      single mission.
                    </p>
                  </div>
                </div>

                <div className={`${styles.recCard} ${styles.redRec}`}>
                  <div className={styles.recImagePlaceholder}>
                    Image Placeholder
                  </div>
                  <div className={styles.recBody}>
                    <h3>GSAT Connectivity</h3>
                    <p>
                      GSAT satellites enable TV broadcasting, internet, weather
                      forecasting, and disaster management across India.
                    </p>
                  </div>
                </div>

                <div className={`${styles.recCard} ${styles.orangeRec}`}>
                  <div className={styles.recImagePlaceholder}>
                    Image Placeholder
                  </div>
                  <div className={styles.recBody}>
                    <h3>Hubble Legacy</h3>
                    <p>
                      NASA’s Hubble Space Telescope began its mission in 1990 and continues
                      to revolutionize our understanding of the universe.
                    </p>
                  </div>
                </div>

                <div className={`${styles.recCard} ${styles.yellowRec}`}>
                  <div className={styles.recImagePlaceholder}>
                    Image Placeholder
                  </div>
                  <div className={styles.recBody}>
                    <h3>NavIC Navigation</h3>
                    <p>
                      NavIC is India’s satellite navigation system providing accurate
                      positioning and timing services over India and nearby regions.
                    </p>
                  </div>
                </div>

                <div className={`${styles.recCard} ${styles.grayRec}`}>
                  <div className={styles.recImagePlaceholder}>
                    Image Placeholder
                  </div>
                  <div className={styles.recBody}>
                    <h3>Aditya-L1 Mission</h3>
                    <p>
                      Aditya-L1 is India’s first solar mission studying the Sun from a
                      special orbit using eco-friendly fuel technologies.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>


        </div>
      </main>
    </div>
  );
};

export default Astrolab1;
