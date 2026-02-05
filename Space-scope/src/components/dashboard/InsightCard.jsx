import { API_BASE_URL } from '../../config';


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Clock, MapPin, Activity, Info } from "lucide-react";

const InsightCard = () => {
  const [insights, setInsights] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchInsights = () => {
    // Note: ensure this port matches your FastAPI port
    fetch(`${API_BASE_URL}/insight`)
      .then((res) => res.json())
      .then((data) => {
        setInsights(data);
      })
      .catch((err) => {
        console.error("Downlink Failed:", err);
      })
      .finally(() => {
        setLoading(false); // CRITICAL: Ends loading state
      });
  };

  useEffect(() => {
    fetchInsights();
    const pollId = setInterval(fetchInsights, 300000); // 5 min refresh
    return () => clearInterval(pollId);
  }, []);

  useEffect(() => {
    if (insights.length <= 1) return;
    const rotateId = setInterval(() => {
      setIndex((i) => (i + 1) % insights.length);
    }, 8000);
    return () => clearInterval(rotateId);
  }, [insights]);

  if (loading || !insights.length) {
    return (
      <div className="h-full w-full bg-slate-950/40 rounded-3xl flex flex-col items-center justify-center border border-white/5 backdrop-blur-xl min-h-[450px]">
        <Activity className="w-8 h-8 text-cyan-500 animate-pulse mb-4" />
        <span className="text-xs font-black text-cyan-500 tracking-[0.4em] uppercase">Initializing Downlink</span>
      </div>
    );
  }

  const active = insights[index];
  const severityStyle = {
    HIGH: "text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    MEDIUM: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    LOW: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
  };

  return (
    <div className="relative w-full h-full bg-slate-900/50 backdrop-blur-3xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden min-h-[450px]">
      
      {/* 1. HUD HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black/40 border border-white/10 rounded-xl">
            <ShieldAlert className={`w-5 h-5 ${active.severity === 'HIGH' ? 'animate-bounce text-red-500' : 'text-cyan-500'}`} />
          </div>
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Planetary Insight</h2>
            <div className={`px-2 py-0.5 mt-1 rounded text-[9px] font-black border inline-block ${severityStyle[active.severity]}`}>
              {active.severity} SEVERITY
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-white/10">
           <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></div>
              <div className="relative rounded-full h-2 w-2 bg-cyan-500"></div>
           </div>
           <span className="text-[9px] font-black text-white/70 font-mono tracking-widest">STREAM ACTIVE</span>
        </div>
      </div>

      {/* 2. MAIN BODY (Animation Mode) */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className="h-full flex flex-col"
          >
            {/* Visual Header */}
            <div className="flex gap-5 mb-6">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <img src={active.image} alt="NASA Earth View" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 right-3 text-3xl drop-shadow-lg">{active.icon}</div>
              </div>
              <div className="flex flex-col justify-center">
                 <h3 className="text-xl font-black text-white italic tracking-tight uppercase leading-tight">
                    {active.title}
                 </h3>
                 <p className="text-[10px] text-white/40 uppercase mt-2 tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Area: {active.location}
                 </p>
              </div>
            </div>

            {/* Insight Text */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-6 relative">
               <Info className="absolute top-4 right-4 w-4 h-4 text-white/10" />
               <p className="text-sm font-semibold text-white/90 leading-relaxed mb-3">
                 {active.desc}
               </p>
               <div className="pt-3 border-t border-white/5 text-[11px] text-cyan-400/80 italic">
                 Source Analysis: <span className="text-white/60 font-medium not-italic">{active.why}</span>
               </div>
            </div>

            {/* Time Stamp */}
            <div className="mt-auto flex items-center gap-2 text-white/30 font-mono text-[10px] uppercase">
               <Clock className="w-3.5 h-3.5" />
               Detected: {new Date(active.time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. PAGINATION DOTS */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {insights.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === index ? "w-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InsightCard;