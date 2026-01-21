import "../../../styles/skyintel/live_sky.css";

import FilterBar from "../../../components/Skyintel/live_sky/FilterBar";
import ObjectCard from "../../../components/Skyintel/live_sky/ObjectCard";
import objects from "../../../data/live_sky/objects.json";

const Live_sky = () => {
  return (
    <div className="live-sky-page">

      <div className="live-sky-filter">
        <FilterBar />
      </div>

      <div className="live-sky-grid">
        {objects.map((obj) => (
          <ObjectCard key={obj.id} object={obj} />
        ))}
      </div>

    </div>
  );
};

export default Live_sky;
