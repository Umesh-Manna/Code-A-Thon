import { API_BASE_URL } from '../../config';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MoonVisual from "./MoonVisual";

const MoonPhaseCard = () => {
  const [moon, setMoon] = useState(null);

  useEffect(() => {
    fetch("${API_BASE_URL}/moon")
      .then(res => res.json())
      .then(setMoon);
  }, []);

  if (!moon) return null;

  const waxing = [
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous"
  ].includes(moon.current.name);

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold mb-4">🌙 Moon Phase</h2>

      {/* CURRENT MOON */}
      <div className="flex flex-col items-center">
        <MoonVisual
          illumination={moon.current.illumination}
          waxing={waxing}
        />

        <p className="mt-3 text-purple-400 font-bold text-lg">
          {moon.current.name}
        </p>

        <p className="text-sm text-white/60">
          Illumination: {moon.current.illumination}%
        </p>
      </div>

      {/* NEXT EVENTS */}
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>🌕 Next Full Moon</span>
          <span className="text-purple-300">
            {new Date(moon.next.full_moon).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>🌑 Next New Moon</span>
          <span className="text-indigo-300">
            {new Date(moon.next.new_moon).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* MOONRISE / MOONSET */}
      <div className="mt-4 border-t border-white/10 pt-3 text-sm">
        <div className="flex justify-between">
          <span>🔭 Moonrise</span>
          <span className="text-green-400">
            {new Date(moon.rise_set.moonrise).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>🌘 Moonset</span>
          <span className="text-red-400">
            {new Date(moon.rise_set.moonset).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* PREVIOUS PHASES */}
{/* Previous Days (Lunar Progression) */}
<div className="mt-3">
  <p className="text-xs text-white/50 mb-2">
    Previous Days (Lunar Progression)
  </p>

  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
    {moon.history.map((d, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-20 text-center"
      >
        {/* Moon */}
        <div className="scale-[0.6] mx-auto">
          <MoonVisual
            illumination={d.illumination}
            waxing={!d.name.includes("Waning")}
          />
        </div>

        {/* Phase name */}
        <p className="text-[10px] text-white/70 leading-tight">
          {d.name}
        </p>

        {/* Illumination */}
        <p className="text-[9px] text-white/40">
          {d.illumination}% lit
        </p>

        {/* Day label */}
        <p className="text-[9px] text-purple-400/70">
          {d.daysAgo}d ago
        </p>
      </div>
    ))}
  </div>
</div>

    </motion.div>
  );
};

export default MoonPhaseCard;
