import "../../../styles/skyintel/live_sky.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import FilterBar from "../../../components/Skyintel/live_sky/FilterBar";
import ObjectCard from "../../../components/Skyintel/live_sky/ObjectCard";
import objects from "../../../data/live_sky/objects.json";
import Navbar from "../../../components/Skyintel/Navbar/Navbar";

const Live_sky = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredObjects = useMemo(() => {
    if (!activeFilter) return objects;
    return objects.filter(obj =>
      obj.categories?.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <div className="live-sky-page">
      {/* Navbar only for Live_sky */}
      <Navbar />

      {/* Main content shifted down */}
      <div className="live-sky-content">
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
      </div>
    </div>
  );
};

export default Live_sky;
