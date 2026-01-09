import React from 'react'
import Sidebar from '../../components/Sidebar';
import { useState } from 'react';
import styles from '../../components/Astrolab1.module.css';

const Astrolab1 = () => {
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
      </div>
  )
}

export default Astrolab1