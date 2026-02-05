import { API_BASE_URL } from '../../config';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Sparkles, Clock, Compass, Eye, AlertCircle } from "lucide-react";

const EventSnapshot = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("${API_BASE_URL}/events");
      const data = await res.json();
      const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      const priority = sorted.filter((e) => e.type === "METEOR" || e.type === "ISS");
      setEvents(priority.slice(0, 2));
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const id = setInterval(fetchEvents, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative group overflow-hidden bg-slate-950/40 backdrop-blur-xl rounded-2xl p-5 h-full border border-white/10 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500/20 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Orbit className="w-4 h-4 text-cyan-400" />
          </div>
          <h2 className="text-sm font-bold text-white tracking-widest uppercase italic">
            Orbital Stream
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-tighter">LIVE</span>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center h-32 gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <span className="text-xs text-cyan-500/50 font-mono tracking-widest uppercase">Scanning frequencies...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
          <AlertCircle className="w-4 h-4" />
          <span>Downlink signal lost</span>
        </div>
      )}

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group/card relative p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300"
              style={{
                boxShadow: `inset 4px 0 0 0 ${event.color || '#06b6d4'}`
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover/card:text-cyan-400 transition-colors tracking-tight">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-[10px] text-white/50">
                      <Clock className="w-3 h-3" />
                      {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div 
                      className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-white/5"
                      style={{ color: event.color }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      {event.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-white/5">
                    <Eye className="w-3 h-3 text-white/40" />
                  </div>
                  <div>
                    <div className="text-[8px] uppercase text-white/30 font-bold">Visibility</div>
                    <div className="text-[10px] font-mono text-white/80">{event.visibility}/5 Rank</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right justify-end">
                  <div className="text-right">
                    <div className="text-[8px] uppercase text-white/30 font-bold">Vector</div>
                    <div className="text-[10px] font-mono text-white/80 uppercase">{event.direction}</div>
                  </div>
                  <div className="p-1 rounded bg-white/5">
                    <Compass className="w-3 h-3 text-white/40" />
                  </div>
                </div>
              </div>

              {/* Card hover effect decorative line */}
              <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover/card:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && !error && events.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xs text-white/30 italic">No threats or flybys detected in current sector.</p>
        </div>
      )}
    </div>
  );
};

export default EventSnapshot;