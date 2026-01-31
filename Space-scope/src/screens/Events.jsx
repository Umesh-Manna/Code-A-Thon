// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Bell, Search, Calendar, Info, X, Trash2 } from "lucide-react";

// /* IMAGES */
// import meteorImg from "/images/meteor.jpg";
// import issImg from "/images/iss.jpg";
// import solarImg from "/images/solar.jpg";
// import eclipseImg from "/images/eclipse.jpg";
// import spaceImg from "/images/SpaceBg.png";

// /* ---------------------------------------------------
//    IMAGE RESOLUTION (ADVANCED)
// --------------------------------------------------- */
// const resolveEventImage = (event) => {
//   if (event.type === "METEOR") {
//     if (event.title?.toLowerCase().includes("perseid")) return meteorImg;
//     if (event.title?.toLowerCase().includes("leonid")) return meteorImg;
//     return meteorImg;
//   }

//   if (event.type === "ISS") return issImg;
//   if (event.type === "SOLAR") return solarImg;
//   if (event.type === "ECLIPSE") return eclipseImg;

//   return spaceImg;
// };

// /* ---------------------------------------------------
//    EVENT CARD
// --------------------------------------------------- */
// const EventCard = ({ event, onNotify }) => {
//   const image = resolveEventImage(event);
//   const [countdown, setCountdown] = useState("");

//   useEffect(() => {
//   if (event.type !== "ISS") return;

//   const target = new Date(event.date).getTime();

//   const timer = setInterval(() => {
//     const diff = target - Date.now();
//     if (diff <= 0) {
//       setCountdown("LIVE NOW");
//       clearInterval(timer);
//       return;
//     }

//     const h = Math.floor(diff / (1000 * 60 * 60));
//     const m = Math.floor((diff / (1000 * 60)) % 60);
//     const s = Math.floor((diff / 1000) % 60);

//     setCountdown(`${h}h ${m}m ${s}s`);
//   }, 1000);

//   return () => clearInterval(timer);
// }, [event]);

//   return (
//     <div className="relative rounded-[28px] border border-cyan-400/40 shadow-[0_0_25px_rgba(0,255,180,0.35)] group overflow-hidden">
      
//       {/* GLASS */}
//       <div className="absolute inset-0 rounded-[28px]  bg-[rgba(45, 47, 66, 0.7)] z-0" />

//       <div className="relative z-10 p-6 flex flex-col lg:flex-row gap-6">

//         {/* LEFT */}
//         <div className="flex-1 space-y-4">
//           <div className="flex gap-3">
//             <Info className="text-white/40 mt-1" />
//             <div>
//               <h2 className="text-2xl font-bold text-white flex items-center gap-3">
//                   {event.title}
//                   {event.type === "ISS" && (
//                     <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/20 text-grey-300 border border-white-400/40 animate-pulse">
//                       🛰️ {countdown}
//                     </span>
//                   )}
//                </h2>

//               <p className="text-sm text-white/50">
//                 <span className="font-semibold text-white">Date:</span>{" "}
//                 {event.date}
//               </p>
//             </div>
//           </div>

//           <p className="text-white/70 text-sm leading-relaxed">
//             {event.desc}
//           </p>

//           {/* VISIBILITY */}
//           <div className="max-w-sm space-y-2">
//             <div className="flex justify-between text-xs font-bold text-white/60">
//               <span>Visibility</span>
//               <span>{event.rating}/5</span>
//             </div>
//             <div className="h-2 bg-white/10 rounded-full">
//               <div
//                 className="h-full rounded-full"
//                 style={{
//                   width: `${(event.rating / 5) * 100}%`,
//                   background: event.color || "#00FFC6",
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* IMAGE WITH PARALLAX */}
//         <div className="relative z-20 w-full lg:w-[260px] h-[180px] rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
          
//           <img
//             src={image}
//             alt={event.title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             loading="lazy"
//           />
//         </div>

//         {/* ACTION */}
//         <div className="flex flex-col justify-between min-w-[160px]">
//           <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
//             {event.region}
//           </span>

//           <button
//             onClick={() => onNotify(event)}
//             className="mt-4 py-3 rounded-xl bg-[#00E600] text-black font-extrabold uppercase hover:scale-105 transition shadow-[0_0_30px_rgba(0,230,0,0.4)]"
//           >
//             Notify Me
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------
//    MAIN PAGE
// --------------------------------------------------- */
// export default function Events() {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [region, setRegion] = useState("ALL");
//   const [timeFilter, setTimeFilter] = useState("PRESENT");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [selectedDate, setSelectedDate] = useState("");

//   /* FETCH */
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/events")
//       .then(res => res.json())
//       .then(data => {
//         setEvents(
//           data.map(e => ({
//             ...e,
//             region: e.direction?.includes("Polar") ? "Polar Regions" : "Global",
//             timestamp: new Date(e.date).getTime(),
//           }))
//         );
//       });
//   }, []);

//   /* Notification add*/
// const handleNotify = (event) => {
//   if (notifications.find(n => n.id === event.id)) return;

//   setNotifications(prev => [...prev, event]);
// };


//   /* NOTIFY */
//   // const handleNotify = (event) => {
//   //   if (notifications.find(n => n.id === event.id)) return;

//   //   if (Notification.permission !== "granted") {
//   //     Notification.requestPermission();
//   //   }

//   //   if (Notification.permission === "granted") {
//   //     new Notification("Sky Event Reminder 🌌", {
//   //       body: event.title,
//   //       icon: "/images/meteor.jpg",
//   //     });
//   //   }

//   //   setNotifications(prev => [...prev, event]);
//   // };

//   /* FILTER */
//   const now = Date.now();
//   const filteredEvents = events.filter(e => {
//     const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
//     const matchRegion = region === "ALL" || e.region === region;
//     const matchTime =
//       timeFilter === "ALL"
//         ? true
//         : timeFilter === "PAST"
//         ? e.timestamp < now
//         : e.timestamp >= now;

//     const matchDate = selectedDate
//       ? e.date === selectedDate
//       : true;

//     return matchSearch && matchRegion && matchTime && matchDate;
//   });

//   return (
//     <div className="relative min-h-screen text-white bg-black overflow-hidden">

//   {/* 🌌 BACKGROUND LAYER (DOES NOT AFFECT LAYOUT) */}
//         <div className="fixed inset-0 z-0 pointer-events-none">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover opacity-100"
//         >
//           <source src="/images/Star2.mp4" type="video/mp4" />
//         </video>

//          <img
//       src="/images/futuristic-moon-background.jpg"
//       alt="space background"
//       className="absolute inset-0 w-full h-full object-cover opacity-95 mix-blend-screen"
//     />


//     {/* Subtle gradient glow */}
//     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
//   </div>

//       <div className="relative z-10 flex min-h-screen">

//         <Sidebar
//           isCollapsed={isSidebarCollapsed}
//           onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//         />

//         <main
//           className={`transition-all duration-300 flex-1 p-10 ${
//             isSidebarCollapsed ? "ml-24" : "ml-64"
//           }`}
//         >
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-4xl font-extrabold">
//               Sky & Space Events
//             </h1>

//             <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="relative"
//               >
//                 <Bell />

//                 {notifications.length > 0 && (
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>
//           </div>

//           {/* FILTER BAR */}
//           <div className="flex flex-wrap gap-4 mb-10">
//             <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
//               <Search size={16} />
//               <input
//                 className="bg-transparent outline-none text-sm"
//                 placeholder="Search events..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
//               <Calendar size={16} className="text-cyan-400" />
//               <span className="text-xs text-white/60">Select date</span>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={e => setSelectedDate(e.target.value)}
//                 className="bg-transparent outline-none text-sm text-white cursor-pointer"
//               />
//             </div>

//             <select
//               value={timeFilter}
//               onChange={e => setTimeFilter(e.target.value)}
//               className="bg-white/5 px-4 py-2 rounded-xl text-sm"
//             >
//               <option value="PRESENT">Upcoming</option>
//               <option value="PAST">Past</option>
//               <option value="ALL">All</option>
//             </select>
//           </div>

//           {/* EVENTS */}
//           <div className="space-y-8">
//             {filteredEvents.map(event => (
//               <EventCard
//                 key={event.id}
//                 event={event}
//                 onNotify={handleNotify}
//               />
//             ))}
//           </div>
//         </main>


//         {showNotifications && (
//   <div className="fixed top-20 right-10 w-[340px] bg-black/90 border border-cyan-400/30 rounded-2xl p-4 z-[200]">
//     <div className="flex justify-between mb-4">
//       <h3 className="font-bold">Notifications</h3>
//       <X
//         className="cursor-pointer"
//         onClick={() => setShowNotifications(false)}
//       />
//     </div>

//     {notifications.length === 0 ? (
//       <p className="text-white/40 text-sm">No notifications yet</p>
//     ) : (
//       notifications.map(n => (
//         <div
//           key={n.id}
//           className="flex justify-between items-center text-sm py-2 border-b border-white/10"
//         >
//           <span>🔔 {n.title}</span>

//           <Trash2
//             size={16}
//             className="cursor-pointer text-red-400"
//             onClick={() =>
//               setNotifications(prev =>
//                 prev.filter(item => item.id !== n.id)
//               )
//             }
//           />
//         </div>
//       ))
//     )}
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, GeoJSON, useMap } from "react-leaflet";
import Sidebar from "../components/Sidebar";
import { 
  Bell, Search, X, Trash2, Cpu, Radio, MoveRight, 
  Telescope, Activity, Sparkles 
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* --- IMAGES --- */
import meteorImg from "/images/meteor.jpg";
import issImg from "/images/iss.jpg";
import solarImg from "/images/solar.jpg";
import eclipseImg from "/images/eclipse.jpg";
import moonTexture from "/images/moon-texture.jpg"; // NEWLY ADDED
import moonBack from "/images/futuristic-moon-background.jpg";

// High-Resolution Image Logic
const getEventTypeVisual = (type, title) => {
  const t = type?.toUpperCase();
  const lowerTitle = title?.toLowerCase() || "";

  // Check for Moon cards specifically
  if (t === "LUNAR" || lowerTitle.includes("moon")) return moonTexture;
  
  if (t === "METEOR") return meteorImg;
  if (t === "ISS") return issImg;
  if (t === "SOLAR") return solarImg;
  if (t === "ECLIPSE" || lowerTitle.includes("eclipse")) return eclipseImg;
  
  return "/images/SpaceBg.png"; 
};

/* --- ISS ICON --- */
const issIcon = new L.DivIcon({
  className: "iss-tactical-icon",
  html: `<div class="scanner-wrap"><div class="scanner-ping"></div>🛰️</div>`,
  iconSize: [45, 45],
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => { if(center) map.setView(center, 4); }, [center]);
  return null;
}

/* --- ORBITAL NIGHT RADAR --- */
const OrbitalMap = () => {
  const [issPos, setIssPos] = useState([20, 77]); 
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson")
      .then(res => res.json()).then(data => setGeoData(data));
    
    const fetchISS = async () => {
      try {
        const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        const data = await res.json();
        setIssPos([data.latitude, data.longitude]);
      } catch (e) { console.warn("API Throttle"); }
    };
    fetchISS();
    const interval = setInterval(fetchISS, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full rounded-[24px] overflow-hidden border border-orange-600/30 relative">
      <MapContainer center={issPos} zoom={4} zoomControl={false} scrollWheelZoom={false} className="w-full h-full bg-black">
        <ChangeView center={issPos} />
        {/* IDEAL NASA NIGHT TILES */}
        <TileLayer 
          url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}/{z}/{y}/{x}.jpg"
          time="default" tilematrixset="GoogleMapsCompatible_Level8"
        />
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={{ color: "#FF4500", weight: 2, fillOpacity: 0, opacity: 0.8 }} 
          />
        )}
        <Marker position={issPos} icon={issIcon} />
      </MapContainer>
      <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-orange-500/50 flex items-center gap-2">
         <Radio size={12} className="text-orange-500 animate-pulse" />
         <span className="text-[10px] font-black text-orange-500 uppercase tracking-tighter">Live Orbital Locked</span>
      </div>
    </div>
  );
};

/* --- TACTICAL EVENT CARD --- */
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
      {/* CARD BODY */}
      <div className="relative flex flex-col xl:flex-row bg-[#080c14]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
        
        {/* LEFT: VISUAL FEED */}
        <div className="w-full xl:w-[420px] h-[300px] p-4 flex-shrink-0">
          {isISS ? <OrbitalMap /> : (
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img src={displayImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent" />
            </div>
          )}
        </div>

        {/* RIGHT: DATA FEED */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="flex items-center gap-2 text-blue-400 font-black text-[10px] tracking-[0.5em] uppercase mb-1">
                  <Sparkles size={12}/> DATA LINK: {event.direction}
                </span>
                <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h2>
              </div>
              <Telescope size={20} className="text-white/20" />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium max-w-xl">{event.desc}</p>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Calculated Time</p>
                <p className="text-xs font-mono text-white italic mt-1">{event.date.replace('T', ' ')}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Visibility</p>
                <div className="flex gap-1 mt-3">
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-1.5 w-full rounded-full ${i < event.rating ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-white/10'}`} />
                   ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
             <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20 text-blue-400"><Cpu size={18}/></div>
                <p className="text-[11px] font-mono text-blue-300 italic opacity-60">AI: PROBABILITY_MATRIX_STABLE</p>
             </div>
             <button 
                onClick={() => onNotify(event)}
                className="bg-white text-black font-black text-[11px] px-10 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-xl uppercase tracking-widest"
             >
                Add to Signal Feed
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* --- MAIN INTERFACE --- */
export default function Events() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("PRESENT");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then(res => res.json())
      .then(data => {
        // Prevent duplicate cards if they appear twice in backend/state
        const unique = Array.from(new Map(data.map(item => [item.id + item.date, item])).values());
        setEvents(unique.map(e => ({ ...e, timestamp: new Date(e.date).getTime() })));
      });
  }, []);

  const handleNotify = (event) => {
    if (notifications.find(n => n.id === event.id)) return;
    setNotifications([event, ...notifications]);
  };

  const filtered = useMemo(() => {
    const now = Date.now();
    return events.filter(e => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchTime = timeFilter === "ALL" ? true : timeFilter === "PAST" ? e.timestamp < now : e.timestamp >= now;
      return matchSearch && matchTime;
    });
  }, [events, search, timeFilter]);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* BACKGROUND SCENE: VIDEO + MOON + GRADIENTS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100 brightness-75">
          <source src="/images/Star2.mp4" type="video/mp4" />
        </video>
        <img src={moonBack} className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-screen grayscale-[50%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 flex min-h-screen bg-transparent">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

        <main className={`flex-1 p-8 lg:p-12 transition-all duration-500 ${isSidebarCollapsed ? "ml-24" : "ml-72"}`}>
          
          <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-16">
             <p className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase mb-1">Interstellar Stream Terminal</p>
             <h1 className="text-7xl font-black italic uppercase tracking-tighter">Space Scope <span className="text-blue-500">Events</span></h1>
          </motion.header>

          {/* FILTER PANEL */}
          <div className="flex flex-wrap gap-4 mb-16 bg-white/5 p-2 rounded-full border border-white/5 backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center gap-4 px-8 py-4 flex-1">
              <Search className="text-blue-400" size={18} />
              <input 
                 className="bg-transparent border-none outline-none text-white text-md uppercase font-bold w-full placeholder:text-white/20"
                 placeholder="Search Celestial Broadcasts..." 
                 value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select 
              value={timeFilter} onChange={e => setTimeFilter(e.target.value)}
              className="bg-black/40 px-8 py-4 rounded-full text-xs font-black tracking-widest uppercase text-blue-400 border border-white/5 outline-none hover:border-blue-500/40 cursor-pointer"
            >
               <option value="PRESENT">Live / Upcoming</option>
               <option value="PAST">Archive Intel</option>
               <option value="ALL">Total Spectrum</option>
            </select>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative h-12 w-12 flex items-center justify-center bg-white/10 rounded-full mr-2 self-center hover:bg-white/20 border border-white/5">
                <Bell size={22} className="text-white"/>
                {notifications.length > 0 && (
                   <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-black animate-pulse">
                      {notifications.length}
                   </span>
                )}
            </button>
          </div>

          <div className="space-y-6">
             <AnimatePresence mode="popLayout">
               {filtered.map((event, idx) => (
                  <EventCard key={event.id + idx} event={event} onNotify={handleNotify} index={idx} />
               ))}
             </AnimatePresence>
          </div>
        </main>
      </div>

      {/* NOTIFICATION HUB */}
      <AnimatePresence>
        {showNotifications && (
           <motion.div initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }} className="fixed top-0 right-0 h-full w-[450px] bg-[#05080c]/95 backdrop-blur-3xl border-l border-white/10 z-[500] p-10 shadow-[-50px_0_100px_rgba(0,0,0,0.8)]">
             <div className="flex justify-between items-center mb-12">
                <span className="text-3xl font-black italic uppercase text-blue-500 tracking-tighter">Signal Queue</span> 
                <X className="cursor-pointer text-white/50 hover:rotate-90 transition-transform" onClick={() => setShowNotifications(false)}/>
             </div>
             <div className="space-y-4">
               {notifications.length === 0 ? <p className="opacity-20 uppercase font-bold tracking-widest text-center mt-20">Standby for Signal Lock...</p> : null}
               {notifications.map(n => (
                 <motion.div layout key={n.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center group">
                    <div>
                      <span className="text-[10px] font-bold text-blue-400">TRACKING_INITIATED</span>
                      <p className="text-sm font-bold uppercase text-white mt-1">{n.title}</p>
                    </div>
                    <Trash2 className="text-red-500/40 cursor-pointer group-hover:text-red-500 transition-colors" onClick={() => setNotifications(notifications.filter(x => x.id !== n.id))} size={18}/>
                 </motion.div>
               ))}
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scanner-wrap { font-size: 28px; filter: drop-shadow(0 0 8px #ff4500); position: relative; }
        .scanner-ping { position: absolute; width: 14px; height: 14px; background: #ff4500; border-radius: 50%; animation: tactical-ping 1.5s infinite; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        @keyframes tactical-ping { 75%, 100% { transform: translate(-50%, -50%) scale(5); opacity: 0; } }
      `}</style>
    </div>
  );
}