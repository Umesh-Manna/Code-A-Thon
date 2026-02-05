import { API_BASE_URL } from '../../config'; 

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Cloud, Wind, Thermometer, Moon, 
  MapPin, Search, ChevronDown, Check, Telescope 
} from "lucide-react";
import countriesData from "./countries.json";

const SkyQualityCard = () => {
  // Updated default to "Global" as requested
  const [country, setCountry] = useState("Global");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/sky-weather?country=${country}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [country]);

  const filtered = useMemo(() => 
    countriesData.filter((c) => c.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  if (!data) return (
    <div className="h-48 w-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center border border-white/5 font-mono text-indigo-400 text-xs tracking-widest uppercase">
       Establishing Link...
    </div>
  );

  const isGood = data.score >= 60;
  const statusColor = isGood ? "text-emerald-400" : "text-amber-400";
  const statusBg = isGood ? "bg-emerald-500/10" : "bg-amber-500/10";
  const statusBorder = isGood ? "border-emerald-500/30" : "border-amber-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-4xl bg-[#0f111a]/80 backdrop-blur-2xl rounded-[1.5rem] p-5 border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 blur-[80px] -mr-20 -mt-20 pointer-events-none" />

      {/* 1. TOP SECTION (Reduced margin from mb-8 to mb-5) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 relative z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <Telescope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white uppercase tracking-tight leading-none">{data.country}</h1>
            <p className="text-indigo-300/50 text-[10px] font-bold uppercase tracking-widest mt-1">Stellar Metrics</p>
          </div>
        </div>

        {/* COMPACT SELECTOR */}
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full sm:w-48 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] font-bold text-white uppercase">{country}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-full sm:w-56 bg-[#0a0a0f] border border-white/10 rounded-xl shadow-2xl z-50 p-1.5 backdrop-blur-3xl"
              >
                <div className="relative mb-1">
                  <Search className="absolute left-2.5 top-2.5 w-3 h-3 text-white/20" />
                  <input
                    placeholder="Search Grid..."
                    className="w-full pl-8 pr-3 py-1.5 text-[10px] bg-white/5 rounded-lg border-none outline-none text-white uppercase font-bold tracking-widest placeholder:text-white/20"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto pointer-events-auto custom-scrollbar">
                  {filtered.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCountry(c); setOpen(false); setQuery(""); }}
                      className="w-full flex items-center justify-between px-3 py-2 text-[10px] hover:bg-indigo-500/20 rounded-lg text-white/40 hover:text-white transition-all text-left uppercase font-black"
                    >
                      {c} {country === c && <Check className="w-3 h-3 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. CORE CONTENT (Using tighter gap-6 instead of gap-8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* SCORE SECTION (Reduced from Col-5 to Col-4 to give graph more room) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-6xl font-black text-white italic leading-none tracking-tighter">
              {data.score}
            </span>
            <span className="text-xl font-bold text-white/10 italic">/100</span>
          </div>
          
          <div className={`px-3 py-0.5 rounded border text-[10px] font-black uppercase mb-4 ${statusColor} ${statusBg} ${statusBorder}`}>
            Verdict: {data.verdict}
          </div>

          {/* DENSE GRID CARDS (p-4 to p-2.5) */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <Metric icon={<Cloud />} val={data.cloudCover + '%'} label="Clouds" color="text-sky-400" />
            <Metric icon={<Wind />} val={data.wind + 'k/h'} label="Wind" color="text-blue-400" />
            <Metric icon={<Thermometer />} val={data.temperature + '°'} label="Temp" color="text-rose-400" />
            <Metric icon={<Moon />} val={data.moonImpact} label="Lunar" color="text-indigo-300" />
          </div>
        </div>

        {/* CHART SECTION (Fixed height h-52 for better alignment) */}
        <div className="lg:col-span-8 w-full h-52 bg-white/[0.02] rounded-[1.25rem] p-4 border border-white/5 relative">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Atmospheric Stability Log // 24H</span>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data.forecast} margin={{ top: 5, right: 0, left: -35, bottom: 0 }}>
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip content={<HUDTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)' }} />
              <Area
                type="monotone"
                dataKey="quality"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#skyGrad)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. COMPACT FOOTER (Reduced margins) */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mr-1 underline decoration-indigo-500/30">Priority Tasks:</span>
        {data.bestFor?.map(task => (
          <span key={task} className="px-2 py-0.5 bg-indigo-500/5 rounded-md text-[9px] font-black text-indigo-400 border border-indigo-500/20 uppercase">
            {task}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/* COMPACT INTERNAL PIECES */

const Metric = ({ icon, val, label, color }) => (
  <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-all group">
    <div className={`mb-1 opacity-70 ${color}`}>{React.cloneElement(icon, { size: 16, strokeWidth: 2.5 })}</div>
    <div className="text-sm font-black text-white italic leading-none">{val}</div>
    <div className="text-[8px] font-bold text-white/20 uppercase mt-0.5">{label}</div>
  </div>
);

const HUDTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f111a] border border-white/10 px-2 py-1.5 rounded-lg shadow-2xl backdrop-blur-md">
        <div className="text-[8px] font-black text-indigo-400 uppercase tracking-wider">{payload[0].payload.time}</div>
        <div className="text-sm font-black italic text-white leading-none mt-1">{payload[0].value}% Score</div>
      </div>
    );
  }
  return null;
};

export default SkyQualityCard;