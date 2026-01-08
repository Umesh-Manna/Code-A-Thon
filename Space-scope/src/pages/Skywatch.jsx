import styles from '../components/Skywatch.module.css';
import Sidebar from '../components/Sidebar';
import Skywatch_nav from '../components/Skywatch_nav';
import { useState } from 'react';

const Skywatch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.container}>
      {/* 1. Sidebar - floating on top */}
      <aside className={`
        ${styles.cell} 
        ${styles.sidebarArea} 
        ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}
      `}>
        {/* Pass state and toggle function to Sidebar */}
        <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar} />
      </aside>

      {/* 2. Navbar */}
      <nav className={`${styles.cell} styles.navbarArea`}>
        <Skywatch_nav />
      </nav>

      {/* 3. Main Content */}
      <main className={styles.infoArea}>
         {/* Your Info and Cards go here */}
      </main>
    </div>
  );
}

export default Skywatch;