import React, { useState } from 'react';
import Sidebar from '../../../../src/components/Sidebar';
import styles from '../../components/Astrolab1.module.css';

// ================= QUIZ SECTION ICONS =================

// Space Explorers
import image1_1 from '../../assets/astrolab/quiz_section/Space_explorer/image1.svg';
import image1_2 from '../../assets/astrolab/quiz_section/Space_explorer/image2.svg';
import image1_3 from '../../assets/astrolab/quiz_section/Space_explorer/image3.svg';

// World Wonder
import image2_1 from '../../assets/astrolab/quiz_section/World_wonder/image1.svg';
import image2_2 from '../../assets/astrolab/quiz_section/World_wonder/image2.svg';
import image2_3 from '../../assets/astrolab/quiz_section/World_wonder/image3.svg';

// Time Travel
import image3_1 from '../../assets/astrolab/quiz_section/TIme_travel/image1.svg';
import image3_2 from '../../assets/astrolab/quiz_section/TIme_travel/image2.svg';
import image3_3 from '../../assets/astrolab/quiz_section/TIme_travel/image3.svg';

// Space Science
import image4_1 from '../../assets/astrolab/quiz_section/Space_science/image1.svg';
import image4_2 from '../../assets/astrolab/quiz_section/Space_science/image2.svg';
import image4_3 from '../../assets/astrolab/quiz_section/Space_science/image3.svg';

// Mix Master Quiz
import image5_1 from '../../assets/astrolab/quiz_section/Mix_master_quiz/image1.svg';
import image5_2 from '../../assets/astrolab/quiz_section/Mix_master_quiz/image2.svg';
import image5_3 from '../../assets/astrolab/quiz_section/Mix_master_quiz/image3.svg';

// ================= INFO SECTION IMAGES =================

import infoImg1 from '../../assets/astrolab/info_section/image1.jpg';
import infoImg2 from '../../assets/astrolab/info_section/image2.jpg';
import infoImg3 from '../../assets/astrolab/info_section/image3.webp';
import infoImg4 from '../../assets/astrolab/info_section/image4.jpg';
import infoImg5 from '../../assets/astrolab/info_section/image5.jpg';
import infoImg6 from '../../assets/astrolab/info_section/image6.jpg';
import infoImg7 from '../../assets/astrolab/info_section/image7.webp';

// ================= SECTION 1 DATA =================

const cards = [
  {
    title: 'Space Explorers',
    desc: 'Travel beyond Earth!\nDiscover planets, stars, astronauts, and amazing space facts.',
    color: 'blue',
    icons: [image1_1, image1_2, image1_3],
  },
  {
    title: 'World Wonder',
    desc: 'Explore our amazing earth\nMountains, Oceans, Earth, Countries and Maps await You.',
    color: 'green',
    icons: [image2_1, image2_2, image2_3],
  },
  {
    title: 'Time Travel',
    desc: 'Stories from past\nLearn about kings, queen, heroes, and ancient times.',
    color: 'purple',
    icons: [image3_1, image3_2, image3_3],
  },
  {
    title: 'Space Science',
    desc: 'How Things Work in Space\nRockets, Satellites, Gravity, invention.',
    color: 'pink',
    icons: [image4_1, image4_2, image4_3],
  },
  {
    title: 'Mix Master Quiz',
    desc: 'A little Bit of Everything\nSpace, Planet, Geography, History, and Science.',
    color: 'yellow',
    icons: [image5_1, image5_2, image5_3],
  },
];

// ================= SECTION 3 DATA (PDF ORDER) =================

const recommendedCards = [
  {
    title: 'Humble Beginnings',
    desc:
      'ISRO was founded in 1969 and began with scientists transporting rocket parts on bicycles—from humble beginnings to global trust.',
    img: infoImg1,
    color: 'blueGalaxyRec',
  },
  {
    title: 'Europa Clipper',
    desc:
      "Europa Clipper is the first mission designed to study Jupiter’s moon Europa in detail and will reach Jupiter by 2030.",
    img: infoImg2,
    color: 'purpleGalaxyRec',
  },
  {
    title: 'PSLV Reliability',
    desc:
      'Known as the workhorse of ISRO, PSLV holds one of the highest global success rates, including a 104-satellite launch in 2017.',
    img: infoImg3,
    color: 'greenRec',
  },
  {
    title: 'GSAT Connectivity',
    desc:
      'GSAT satellites support TV broadcasting, internet, weather forecasting, and disaster management across India.',
    img: infoImg4,
    color: 'redRec',
  },
  {
    title: 'Hubble Legacy',
    desc:
      'Launched in 1990, NASA’s Hubble Space Telescope continues to revolutionize our understanding of the universe.',
    img: infoImg5,
    color: 'orangeRec',
  },
  {
    title: 'NavIC Navigation',
    desc:
      'NavIC is India’s satellite navigation system offering precise positioning and timing across India and nearby regions.',
    img: infoImg7,
    color: 'yellowRec',
  },
  {
    title: 'Aditya-L1 Mission',
    desc:
      'India’s first solar mission, Aditya-L1 studies the Sun from a special orbit using eco-friendly fuel technologies.',
    img: infoImg7,
    color: 'grayRec',
  },
];

// ================= COMPONENT =================

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

              <div className={styles.playSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.explore}>Explore Category →</span>
                </div>

                <div className={styles.cardRow}>
                  {cards.map((card, i) => (
                    <div key={i} className={`${styles.card} ${styles[card.color]}`}>
                      <div className={styles.iconTray}>
                        {card.icons.map((icon, idx) => (
                          <img key={idx} src={icon} className={styles.iconImg} alt="" />
                        ))}
                      </div>

                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>

                      <div className={styles.cardFooter}>
                        <span className={styles.badge}>30 Q</span>
                        <button className={styles.playBtn}>▶ Play</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ================= SECTION 3 ================= */}
          <section className={styles.pageSection}>
            <div className={styles.recSection}>
              <div className={styles.recHeader}>
                <h2>Recommended for you.</h2>
                <span>Explore More →</span>
              </div>

              <div className={styles.recRow}>
                {recommendedCards.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${styles.recCard} ${styles[item.color]}`}
                  >
                    <div className={styles.recImagePlaceholder}>
                      <img src={item.img} alt={item.title} />
                    </div>

                    <div className={styles.recBody}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Astrolab1;
