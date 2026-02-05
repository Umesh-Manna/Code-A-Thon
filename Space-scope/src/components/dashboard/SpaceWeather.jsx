import { API_BASE_URL } from '../../config';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ---------- Helpers ---------- */

const levelMeta = (kp) => {
  if (kp >= 7) return { label: "SEVERE STORM", color: "bg-red-500" };
  if (kp >= 5) return { label: "MODERATE STORM", color: "bg-orange-400" };
  return { label: "QUIET / STABLE", color: "bg-green-400" };
};

const pulseSpeed = (kp) => {
  if (kp >= 7) return 0.8;
  if (kp >= 5) return 1.2;
  return 2;
};

/* ---------- Component ---------- */

const SpaceWeather = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      fetch(`${API_BASE_URL}/space-weather`)
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 120000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="p-4 bg-white/5 rounded-xl animate-pulse">
        Loading live space weather…
      </div>
    );
  }

  const level = levelMeta(data.kpIndex);

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-white/10 space-y-4"
      animate={{
        boxShadow: [
          "0 0 10px rgba(255,255,255,0.05)",
          "0 0 20px rgba(255,180,0,0.15)",
          "0 0 10px rgba(255,255,255,0.05)",
        ],
      }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      {/* ---------- Header ---------- */}
      <div>
        <h2 className="font-semibold text-lg">☀️ Space Weather Status</h2>
        <p className="text-xs text-white/60">
          Live geomagnetic conditions near Earth
        </p>
      </div>

      {/* ---------- Storm Level (KP) ---------- */}
      <div className="space-y-2 group relative">
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">
            KP Index
            <span className="text-white/40 cursor-help">ⓘ</span>
          </span>
          <span className="font-bold">
            {level.label} (KP {data.kpIndex})
          </span>
        </div>

        {/* Tooltip */}
        <div className="absolute left-0 top-8 hidden group-hover:block z-20">
          <div className="bg-black text-xs text-white/80 p-2 rounded-md w-56 border border-white/10">
            KP Index measures geomagnetic storm intensity on a scale of 0–9.
            Higher values mean stronger impact on satellites and radio signals.
          </div>
        </div>

        <div className="w-full h-2 bg-white/10 rounded overflow-hidden">
          <motion.div
            className={`h-full ${level.color}`}
            animate={{
              width: `${(data.kpIndex / 9) * 100}%`,
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              width: { duration: 1 },
              opacity: { repeat: Infinity, duration: 2 },
            }}
          />
        </div>
      </div>

      {/* ---------- SUN WITH RAYS ---------- */}
      <div className="relative flex justify-center items-center h-28">
        {/* Rays */}
        <motion.div
          className="absolute w-28 h-28 rounded-full border border-yellow-400/30"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20 - data.kpIndex * 2,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute w-36 h-36 rounded-full border border-orange-400/20"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 30 - data.kpIndex * 2,
            ease: "linear",
          }}
        />

        {/* Core */}
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_30px_rgba(255,180,0,0.6)]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            repeat: Infinity,
            duration: pulseSpeed(data.kpIndex),
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ---------- Metrics ---------- */}
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {/* Solar Wind */}
        <motion.div
          className="bg-white/5 rounded-lg p-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <div className="text-white/60">Solar Wind</div>
          <div className="font-bold">{data.solarWind} km/s</div>
          <div className="text-xs text-white/40">Particle speed</div>
        </motion.div>

        {/* IMF Bz with tooltip */}
        <motion.div
          className="bg-white/5 rounded-lg p-2 group relative"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.3 }}
        >
          <div className="text-white/60 flex justify-center items-center gap-1">
            IMF Bz <span className="text-white/40 cursor-help">ⓘ</span>
          </div>
          <div className="font-bold">+3 nT</div>
          <div className="text-xs text-white/40">Magnetic field</div>

          {/* Tooltip */}
          <div className="absolute top-full mt-2 hidden group-hover:block z-20">
            <div className="bg-black text-xs text-white/80 p-2 rounded-md w-56 border border-white/10">
              IMF Bz shows the Sun’s magnetic field direction.
              Southward values increase storm risk; northward is more stable.
            </div>
          </div>
        </motion.div>

        {/* Radiation */}
        <motion.div
          className="bg-white/5 rounded-lg p-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.6 }}
        >
          <div className="text-white/60">Radiation</div>
          <div
            className={`font-bold ${
              data.radiation === "Elevated"
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {data.radiation}
          </div>
          <div className="text-xs text-white/40">Satellite risk</div>
        </motion.div>
      </div>

      {/* ---------- Explanation ---------- */}
      <div className="text-xs text-white/70 bg-white/5 p-3 rounded-lg leading-relaxed">
        {data.kpIndex >= 7 && (
          <>⚠️ Severe geomagnetic storm. Possible satellite and communication disruptions.</>
        )}
        {data.kpIndex >= 5 && data.kpIndex < 7 && (
          <>⚠️ Moderate solar activity. Auroras likely near polar regions.</>
        )}
        {data.kpIndex < 5 && (
          <>✅ Space weather is stable. No significant operational risk.</>
        )}
      </div>
    </motion.div>
  );
};

export default SpaceWeather;
