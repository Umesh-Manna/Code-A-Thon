import React from 'react';
import Sidebar from '../../components/Sidebar';
import styles from '../../components/Astrolab1.module.css';

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
  return (
    <div className={styles.container}>
      <aside className={styles.sidebarArea}>
        <Sidebar />
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
          <section className={styles.pageSection} />

          {/* ================= SECTION 3 ================= */}
          <section className={styles.pageSection} />

        </div>
      </main>
    </div>
  );
};

export default Astrolab1;
