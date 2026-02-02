import "../../../styles/skyintel/live_sky.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import FilterBar from "../../../components/Skyintel/live_sky/FilterBar";
import ObjectCard from "../../../components/Skyintel/live_sky/ObjectCard";
import objects from "../../../data/live_sky/objects.json";

// import Sidebar from "../../../components/Sidebar";
import Sidebar from '../../../../../src/components/Sidebar';
import Navbar from "../../../components/Skyintel/Navbar/Navbar";

const Live_sky = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const filteredObjects = useMemo(() => {
    if (!activeFilter) return objects;
    return objects.filter(obj =>
      obj.categories?.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <div className="live-sky-container">
      {/* ================= SIDEBAR (LOCKED) ================= */}
      <aside className="live-sky-sidebar-area">
        <div
          className={`live-sky-sidebar-content ${
            isSidebarOpen ? "expanded" : ""
          }`}
        >
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>
      </aside>

      {/* ================= NAVBAR (LOCKED) ================= */}
      <nav className="live-sky-navbar-area">
        <Navbar />
      </nav>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <main className="live-sky-scroll-area">
        <div className="live-sky-filter">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="live-sky-grid">
          {filteredObjects.map((obj) => (
            <ObjectCard
              key={obj.id}
              object={obj}
              onOpen={() =>
                navigate(`/skyintel/live_sky/object/${obj.id}`)
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Live_sky;
