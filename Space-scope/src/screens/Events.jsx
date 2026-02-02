import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Search,
  X,
  Trash2,
  Cpu,
  Radio,
  Telescope,
  Sparkles,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Events.module.css";

/* ================= IMAGES ================= */
import meteorImg from "/images/meteor.jpg";
import issImg from "/images/iss.jpg";
import solarImg from "/images/solar.jpg";
import eclipseImg from "/images/eclipse.jpg";
import moonTexture from "/images/moon-texture.jpg";
import moonBack from "/images/futuristic-moon-background.jpg";

/* ================= IMAGE PICKER ================= */
const getEventTypeVisual = (type, title) => {
  const t = type?.toUpperCase();
  const lowerTitle = title?.toLowerCase() || "";

  if (t === "LUNAR" || lowerTitle.includes("moon")) return moonTexture;
  if (t === "METEOR") return meteorImg;
  if (t === "ISS") return issImg;
  if (t === "SOLAR") return solarImg;
  if (t === "ECLIPSE" || lowerTitle.includes("eclipse")) return eclipseImg;

  return "/images/SpaceBg.png";
};

/* ================= ISS ICON ================= */
const issIcon = new L.DivIcon({
  className: "iss-tactical-icon",
  html: `<div class="scanner-wrap"><div class="scanner-ping"></div>🛰️</div>`,
  iconSize: [45, 45],
});

function ChangeView({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) map.setView(center, 4);
  }, [center]);
  return null;
}

/* ================= ORBITAL MAP ================= */
const OrbitalMap = () => {
  const [issPos, setIssPos] = useState([20, 77]);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson"
    )
      .then((res) => res.json())
      .then(setGeoData);

    const fetchISS = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = await res.json();
        setIssPos([data.latitude, data.longitude]);
      } catch {}
    };

    fetchISS();
    const id = setInterval(fetchISS, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full rounded-[24px] overflow-hidden border border-orange-600/30 relative">
      <MapContainer
        center={issPos}
        zoom={4}
        zoomControl={false}
        scrollWheelZoom={false}
        className="w-full h-full bg-black"
      >
        <ChangeView center={issPos} />
        <TileLayer
          url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}/{z}/{y}/{x}.jpg"
          time="default"
          tilematrixset="GoogleMapsCompatible_Level8"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={{ color: "#FF4500", weight: 2, fillOpacity: 0 }}
          />
        )}
        <Marker position={issPos} icon={issIcon} />
      </MapContainer>

      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-orange-500/50 flex items-center gap-2">
        <Radio size={12} className="text-orange-500 animate-pulse" />
        <span className="text-[10px] font-black text-orange-500 uppercase">
          Live Orbital Locked
        </span>
      </div>
    </div>
  );
};

/* ================= EVENT CARD ================= */
const EventCard = ({ event, onNotify, index }) => {
  const isISS = event.type === "ISS";
  const displayImg = getEventTypeVisual(event.type, event.title);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative mb-8"
    >
      <div className="relative flex flex-col xl:flex-row bg-[#080c14]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="w-full xl:w-[420px] h-[300px] p-4 flex-shrink-0">
          {isISS ? (
            <OrbitalMap />
          ) : (
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src={displayImg}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]" />
            </div>
          )}
        </div>

        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <span className="flex items-center gap-2 text-blue-400 font-black text-[10px] tracking-[0.5em] uppercase mb-1">
              <Sparkles size={12} /> DATA LINK
            </span>

            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              {event.title}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
              {event.desc}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20 text-blue-400">
                <Cpu size={18} />
              </div>
              <p className="text-[11px] font-mono text-blue-300 italic opacity-60">
                AI: PROBABILITY_MATRIX_STABLE
              </p>
            </div>

            <button
              onClick={() => onNotify(event)}
              className="bg-white text-black font-black text-[11px] px-10 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest"
            >
              Add to Signal Feed
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN PAGE ================= */
export default function Events() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("PRESENT");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(
          new Map(data.map((item) => [item.id + item.date, item])).values()
        );
        setEvents(
          unique.map((e) => ({
            ...e,
            timestamp: new Date(e.date).getTime(),
          }))
        );
      });
  }, []);

  const filtered = useMemo(() => {
    const now = Date.now();
    return events.filter((e) => {
      const matchSearch = e.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchTime =
        timeFilter === "ALL"
          ? true
          : timeFilter === "PAST"
          ? e.timestamp < now
          : e.timestamp >= now;
      return matchSearch && matchTime;
    });
  }, [events, search, timeFilter]);

  const handleNotify = (event) => {
    if (notifications.find((n) => n.id === event.id)) return;
    setNotifications([event, ...notifications]);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/images/Star2.mp4" type="video/mp4" />
        </video>
        <img src={moonBack} className="absolute inset-0 w-full h-full object-cover mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* ROOT LAYOUT */}
      <div className={`relative z-10 ${styles.eventsContainer}`}>
        {/* SIDEBAR OVERLAY */}
        <aside className={styles.sidebarArea}>
          <div
            className={`${styles.sidebarContent} ${
              !isSidebarCollapsed ? styles.expanded : ""
            }`}
          >
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              onToggle={() =>
                setIsSidebarCollapsed(!isSidebarCollapsed)
              }
            />
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.mainContent}>
          {/* ===== HEADER + SEARCH BAR (RESTORED) ===== */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16"
          >
            <p className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase mb-1">
              Interstellar Stream Terminal
            </p>
            <h1 className="text-7xl font-black italic uppercase tracking-tighter">
              Space Scope <span className="text-blue-500">Events</span>
            </h1>
          </motion.header>

          <div className="flex flex-wrap gap-4 mb-16 bg-white/5 p-2 rounded-full border border-white/5 backdrop-blur-3xl">
            <div className="flex items-center gap-4 px-8 py-4 flex-1">
              <Search className="text-blue-400" size={18} />
              <input
                className="bg-transparent outline-none text-white uppercase font-bold w-full placeholder:text-white/20"
                placeholder="Search Celestial Broadcasts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-black/40 px-8 py-4 rounded-full text-xs font-black tracking-widest uppercase text-blue-400 border border-white/5"
            >
              <option value="PRESENT">Live / Upcoming</option>
              <option value="PAST">Archive Intel</option>
              <option value="ALL">Total Spectrum</option>
            </select>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative h-12 w-12 flex items-center justify-center bg-white/10 rounded-full border border-white/5"
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full text-[10px] font-black flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* ===== EVENTS LIST ===== */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, idx) => (
                <EventCard
                  key={event.id + idx}
                  event={event}
                  index={idx}
                  onNotify={handleNotify}
                />
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* NOTIFICATIONS */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            className="fixed top-0 right-0 h-full w-[450px] bg-[#05080c]/95 backdrop-blur-3xl border-l border-white/10 z-[500] p-10"
          >
            <div className="flex justify-between mb-10">
              <span className="text-3xl font-black uppercase text-blue-500">
                Signal Queue
              </span>
              <X
                className="cursor-pointer"
                onClick={() => setShowNotifications(false)}
              />
            </div>

            <div className="space-y-4">
              {notifications.length === 0 && (
                <p className="opacity-20 uppercase font-bold tracking-widest text-center mt-20">
                  Standby for Signal Lock...
                </p>
              )}
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-6 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center"
                >
                  <p className="font-bold uppercase">{n.title}</p>
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() =>
                      setNotifications(
                        notifications.filter((x) => x.id !== n.id)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
