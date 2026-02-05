import { API_BASE_URL } from '../../config';

import { useEffect, useState } from "react";

export default function MissionControlCard() {
  const [missions, setMissions] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Fetch missions
  useEffect(() => {
    fetch(`${API_BASE_URL}/missions`)
      .then(res => res.json())
      .then(setMissions)
      .catch(console.error);
  }, []);

  // Real-time clock
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // Auto-rotation with user control
  useEffect(() => {
    if (paused || missions.length === 0) return;

    const r = setInterval(() => {
      setIndex(i => (i + 1) % missions.length);
    }, 15000);

    return () => clearInterval(r);
  }, [paused, missions]);

  if (!missions.length) return null;

  const mission = missions[index];
  const launchTime = new Date(mission.launch_time).getTime();
  const diff = launchTime - now;

  const formatCountdown = ms => {
    if (ms <= 0) return "T+00:00:00";
    const s = Math.floor(ms / 1000);
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `T-${h}:${m}:${sec}`;
  };

  const status =
    diff <= 0 ? "IN FLIGHT" :
    diff < 10 * 60 * 1000 ? "AUTO SEQUENCE" :
    diff < 60 * 60 * 1000 ? "FINAL CHECKS" :
    "GO FOR LAUNCH";

  return (
    <div
      className="bg-black text-green-400 p-6 rounded-xl font-mono shadow-xl w-full max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex justify-between text-xs opacity-80">
        <span>{mission.agency.toUpperCase()}</span>
        <span>{mission.mission_id}</span>
      </div>

      <h2 className="text-lg mt-3 text-white">
        {mission.mission_name}
      </h2>

      <div className="mt-4 space-y-1 text-sm">
        <div>VEHICLE: {mission.vehicle}</div>
        <div>ORBIT: {mission.orbit}</div>
        <div>LAUNCH SITE: {mission.launch_site}</div>
      </div>

      <div className="mt-5 text-2xl text-white tracking-widest">
        {formatCountdown(diff)}
      </div>

      <div className={`mt-2 text-sm ${
        status === "IN FLIGHT" ? "text-blue-400" :
        status === "AUTO SEQUENCE" ? "text-red-400" :
        "text-yellow-400"
      }`}>
        STATUS: {status}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-4 text-xs text-white opacity-70">
        <button onClick={() => setIndex(i => Math.max(i - 1, 0))}>◀ PREV</button>
        <button onClick={() => setPaused(p => !p)}>
          {paused ? "▶ RESUME" : "⏸ PAUSE"}
        </button>
        <button onClick={() => setIndex(i => (i + 1) % missions.length)}>NEXT ▶</button>
      </div>
    </div>
  );
}
