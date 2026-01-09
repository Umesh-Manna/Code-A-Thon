// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import GlobeComponent from "../components/Globe";

// const Dashboard = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="flex bg-[#0A0F1F] text-white min-h-screen">

//       <Sidebar
//         isCollapsed={isCollapsed}
//         onToggle={() => setIsCollapsed(!isCollapsed)}
//       />

//       <div
//         className={`transition-all duration-300 p-6 w-full
//         ${isCollapsed ? "ml-20" : "ml-52"}`}
//       >
//         <h1 className="text-2xl font-bold">The world in Real-Time</h1>

//         {/* 🌍 REAL-TIME GLOBE */}
//         <GlobeComponent />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import GlobeComponent from "../components/Globe";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [activeLayers, setActiveLayers] = useState({
    fires: false,
    cyclones: false,
    clouds: false,
    temp: false
  });

  const toggleLayer = (layer) =>
    setActiveLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));

  return (
    <div className="h-screen bg-[#010208] text-white flex overflow-hidden">

      {/* MAIN SIDEBAR */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {/* CONTENT */}
      <div className={`flex flex-1 ${isCollapsed ? "ml-20" : "ml-52"}`}>

        {/* LEFT DATA PANEL */}
        <aside className="w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col gap-4">
          <h2 className="text-xs tracking-widest text-cyan-400 font-bold">
            DATA LAYERS
          </h2>

          <Toggle label="🔥 Fire Hotspots" active={activeLayers.fires} onClick={() => toggleLayer("fires")} />
          <Toggle label="🌀 Cyclones" active={activeLayers.cyclones} onClick={() => toggleLayer("cyclones")} />
          <Toggle label="☁️ Clouds" active={activeLayers.clouds} onClick={() => toggleLayer("clouds")} />
          <Toggle label="🌡 Temperature" active={activeLayers.temp} onClick={() => toggleLayer("temp")} />

          <p className="mt-auto text-[10px] text-white/40 tracking-widest">
            SELECT LAYERS TO VISUALIZE
          </p>
        </aside>

        {/* GLOBE AREA */}
        <main className="flex-1 flex flex-col items-center justify-center">

          <div className="mb-6 text-center">
            <h1 className="text-4xl font-black italic">EARTH INTELLIGENCE</h1>
            <p className="text-xs tracking-[4px] text-cyan-400">
              NOAA-STYLE GLOBAL MONITORING
            </p>
          </div>

          {/* 🌍 GLOBE */}
          <GlobeComponent activeLayers={activeLayers} />

          {/* TIME SLIDER (future sync) */}
          <div className="mt-8 w-[420px]">
            <input
              type="range"
              min="0"
              max="100"
              className="w-full accent-cyan-400"
            />
            <p className="text-center text-[10px] tracking-widest text-white/40 mt-2">
              TIME DISPLACEMENT
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

const Toggle = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-3 rounded-lg border text-xs tracking-widest transition-all
      ${
        active
          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
          : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
      }`}
  >
    {label}
  </button>
);

export default Dashboard;




