import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Search, Calendar, Info, X, Trash2 } from "lucide-react";

/* IMAGES */
import meteorImg from "/images/meteor.jpg";
import issImg from "/images/iss.jpg";
import solarImg from "/images/solar.jpg";
import eclipseImg from "/images/eclipse.jpg";
import spaceImg from "/images/SpaceBg.png";

/* ---------------------------------------------------
   IMAGE RESOLUTION (ADVANCED)
--------------------------------------------------- */
const resolveEventImage = (event) => {
  if (event.type === "METEOR") {
    if (event.title?.toLowerCase().includes("perseid")) return meteorImg;
    if (event.title?.toLowerCase().includes("leonid")) return meteorImg;
    return meteorImg;
  }

  if (event.type === "ISS") return issImg;
  if (event.type === "SOLAR") return solarImg;
  if (event.type === "ECLIPSE") return eclipseImg;

  return spaceImg;
};

/* ---------------------------------------------------
   EVENT CARD
--------------------------------------------------- */
const EventCard = ({ event, onNotify }) => {
  const image = resolveEventImage(event);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
  if (event.type !== "ISS") return;

  const target = new Date(event.date).getTime();

  const timer = setInterval(() => {
    const diff = target - Date.now();
    if (diff <= 0) {
      setCountdown("LIVE NOW");
      clearInterval(timer);
      return;
    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    setCountdown(`${h}h ${m}m ${s}s`);
  }, 1000);

  return () => clearInterval(timer);
}, [event]);

  return (
    <div className="relative rounded-[28px] border border-cyan-400/40 shadow-[0_0_25px_rgba(0,255,180,0.35)] group overflow-hidden">
      
      {/* GLASS */}
      <div className="absolute inset-0 rounded-[28px]  bg-[rgba(45, 47, 66, 0.7)] z-0" />

      <div className="relative z-10 p-6 flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1 space-y-4">
          <div className="flex gap-3">
            <Info className="text-white/40 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  {event.title}
                  {event.type === "ISS" && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/20 text-grey-300 border border-white-400/40 animate-pulse">
                      🛰️ {countdown}
                    </span>
                  )}
               </h2>

              <p className="text-sm text-white/50">
                <span className="font-semibold text-white">Date:</span>{" "}
                {event.date}
              </p>
            </div>
          </div>

          <p className="text-white/70 text-sm leading-relaxed">
            {event.desc}
          </p>

          {/* VISIBILITY */}
          <div className="max-w-sm space-y-2">
            <div className="flex justify-between text-xs font-bold text-white/60">
              <span>Visibility</span>
              <span>{event.rating}/5</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(event.rating / 5) * 100}%`,
                  background: event.color || "#00FFC6",
                }}
              />
            </div>
          </div>
        </div>

        {/* IMAGE WITH PARALLAX */}
        <div className="relative z-20 w-full lg:w-[260px] h-[180px] rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
          
          <img
            src={image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* ACTION */}
        <div className="flex flex-col justify-between min-w-[160px]">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
            {event.region}
          </span>

          <button
            onClick={() => onNotify(event)}
            className="mt-4 py-3 rounded-xl bg-[#00E600] text-black font-extrabold uppercase hover:scale-105 transition shadow-[0_0_30px_rgba(0,230,0,0.4)]"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   MAIN PAGE
--------------------------------------------------- */
export default function Events() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("ALL");
  const [timeFilter, setTimeFilter] = useState("PRESENT");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  /* FETCH */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then(res => res.json())
      .then(data => {
        setEvents(
          data.map(e => ({
            ...e,
            region: e.direction?.includes("Polar") ? "Polar Regions" : "Global",
            timestamp: new Date(e.date).getTime(),
          }))
        );
      });
  }, []);

  /* Notification add*/
const handleNotify = (event) => {
  if (notifications.find(n => n.id === event.id)) return;

  setNotifications(prev => [...prev, event]);
};


  /* NOTIFY */
  // const handleNotify = (event) => {
  //   if (notifications.find(n => n.id === event.id)) return;

  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission();
  //   }

  //   if (Notification.permission === "granted") {
  //     new Notification("Sky Event Reminder 🌌", {
  //       body: event.title,
  //       icon: "/images/meteor.jpg",
  //     });
  //   }

  //   setNotifications(prev => [...prev, event]);
  // };

  /* FILTER */
  const now = Date.now();
  const filteredEvents = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "ALL" || e.region === region;
    const matchTime =
      timeFilter === "ALL"
        ? true
        : timeFilter === "PAST"
        ? e.timestamp < now
        : e.timestamp >= now;

    const matchDate = selectedDate
      ? e.date === selectedDate
      : true;

    return matchSearch && matchRegion && matchTime && matchDate;
  });

  return (
    <div className="relative min-h-screen text-white bg-black overflow-hidden">

  {/* 🌌 BACKGROUND LAYER (DOES NOT AFFECT LAYOUT) */}
  <div className="fixed inset-0 z-0 pointer-events-none">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    >
      <source src="/images/Star2.mp4" type="video/mp4" />
    </video>

    {/* Image overlay */}
    <img
      src="/images/futuristic-moon-background.jpg"
      alt="space background"
      className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
    />

    {/* Subtle gradient glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
  </div>

      <div className="relative z-10 flex min-h-screen">

        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main
          className={`transition-all duration-300 flex-1 p-10 ${
            isSidebarCollapsed ? "ml-24" : "ml-64"
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold">
              Sky & Space Events
            </h1>

            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell />

                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
              <Search size={16} />
              <input
                className="bg-transparent outline-none text-sm"
                placeholder="Search events..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
              <Calendar size={16} className="text-cyan-400" />
              <span className="text-xs text-white/60">Select date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="bg-transparent outline-none text-sm text-white cursor-pointer"
              />
            </div>

            <select
              value={timeFilter}
              onChange={e => setTimeFilter(e.target.value)}
              className="bg-white/5 px-4 py-2 rounded-xl text-sm"
            >
              <option value="PRESENT">Upcoming</option>
              <option value="PAST">Past</option>
              <option value="ALL">All</option>
            </select>
          </div>

          {/* EVENTS */}
          <div className="space-y-8">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onNotify={handleNotify}
              />
            ))}
          </div>
        </main>


        {showNotifications && (
  <div className="fixed top-20 right-10 w-[340px] bg-black/90 border border-cyan-400/30 rounded-2xl p-4 z-[200]">
    <div className="flex justify-between mb-4">
      <h3 className="font-bold">Notifications</h3>
      <X
        className="cursor-pointer"
        onClick={() => setShowNotifications(false)}
      />
    </div>

    {notifications.length === 0 ? (
      <p className="text-white/40 text-sm">No notifications yet</p>
    ) : (
      notifications.map(n => (
        <div
          key={n.id}
          className="flex justify-between items-center text-sm py-2 border-b border-white/10"
        >
          <span>🔔 {n.title}</span>

          <Trash2
            size={16}
            className="cursor-pointer text-red-400"
            onClick={() =>
              setNotifications(prev =>
                prev.filter(item => item.id !== n.id)
              )
            }
          />
        </div>
      ))
    )}
  </div>
)}

      </div>
    </div>
  );
}
