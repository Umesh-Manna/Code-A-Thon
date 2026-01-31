import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronDown } from "lucide-react";

export default function Milestones() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [events, setEvents] = useState([]);

  /* ---------------- FILTER STATE ---------------- */
  const [status, setStatus] = useState("All");
  const [mission, setMission] = useState("All");
  const [destination, setDestination] = useState("All");
  const [organisation, setOrganisation] = useState("All");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/milestones")
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]));
  }, []);

  /* ---------------- DRAG SCROLL ---------------- */
  useEffect(() => {
    const el = document.getElementById("timeline-scroll");
    if (!el) return;

    let isDown = false;
    let startY = 0;
    let scrollTop = 0;

    const mouseDown = e => {
      isDown = true;
      startY = e.pageY - el.offsetTop;
      scrollTop = el.scrollTop;
      el.style.cursor = "grabbing";
    };

    const mouseLeave = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    const mouseUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    const mouseMove = e => {
      if (!isDown) return;
      e.preventDefault();
      const y = e.pageY - el.offsetTop;
      const walk = (y - startY) * 1.2;
      el.scrollTop = scrollTop - walk;
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseleave", mouseLeave);
    el.addEventListener("mouseup", mouseUp);
    el.addEventListener("mousemove", mouseMove);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("mouseleave", mouseLeave);
      el.removeEventListener("mouseup", mouseUp);
      el.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  /* ---------------- FILTERED DATA ---------------- */
  const filtered = useMemo(() => {
    return events.filter(e => {
      if (!e) return false;
      if (status !== "All" && e.status !== status) return false;
      if (mission !== "All" && e.vehicle !== mission) return false;
      if (destination !== "All" && e.destination !== destination) return false;
      if (organisation !== "All" && e.agency !== organisation) return false;
      return true;
    });
  }, [events, status, mission, destination, organisation]);

  /* ---------------- OPTIONS ---------------- */
  const missions = ["All", ...new Set(events.map(e => e?.vehicle).filter(Boolean))];
  const destinations = ["All", ...new Set(events.map(e => e?.destination).filter(Boolean))];
  const organisations = ["All", ...new Set(events.map(e => e?.agency).filter(Boolean))];

  return (
    <div className="relative min-h-screen text-white bg-black">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/images/Star2.mp4" type="video/mp4" />
        </video>

        <img
          src="/images/futuristic-moon-background.jpg"
          alt="space background"
          className="absolute inset-0 w-full h-full object-cover opacity-95 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
      </div>

      <div className="flex min-h-screen relative z-10">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main
          className={`transition-all duration-300 flex-1 overflow-x-hidden ${
            isSidebarCollapsed ? "ml-24" : "ml-64"
          }`}
        >
          {/* ================= FILTER BAR ================= */}
          <div className="sticky top-0 z-30 bg-gradient-to-b from-[#06162A] to-[#020B17] px-10 py-4 border-b border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-widest text-white/70">
                  STATUS
                </span>
                <div className="flex bg-white/5 rounded-full overflow-hidden border border-white/10">
                  {["All", "Successful", "Failed"].map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-4 py-1 text-sm transition ${
                        status === s
                          ? "bg-cyan-400 text-black font-bold"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <FilterSelect label="MISSIONS" value={mission} setValue={setMission} options={missions} />
              <FilterSelect label="DESTINATION" value={destination} setValue={setDestination} options={destinations} />
              <FilterSelect label="ORGANISATION" value={organisation} setValue={setOrganisation} options={organisations} />

              <button
                onClick={() => {
                  setStatus("All");
                  setMission("All");
                  setDestination("All");
                  setOrganisation("All");
                }}
                className="ml-auto px-6 py-2 rounded-lg border border-white/20 text-sm hover:bg-white/10"
              >
                RESET
              </button>
            </div>
          </div>

          {/* ================= TIMELINE ================= */}
          <div
            id="timeline-scroll"
            className="relative px-10 py-24 max-w-[1400px] mx-auto h-[calc(100vh-96px)] overflow-y-scroll overflow-x-hidden cursor-grab scrollbar-hide"
          >
            {/* CENTER LINE — FIXED */}
            {/* <div
              className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-900 shadow-[0_0_40px_rgba(0,255,255,0.8)]"
              style={{ height: `${filtered.length * 22}rem` }}
            /> */}

            <div className="relative space-y-56">
                <div
  className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px]
  bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-900
  shadow-[0_0_40px_rgba(0,255,255,0.8)]"
/>

              {filtered.map((e, i) => (
                <div
                  key={i}
                  className={`relative flex w-full ${
                    i % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* NODE */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full z-30 ${
                      e.is_now
                        ? "bg-green-400 shadow-[0_0_50px_rgba(0,255,0,1)]"
                        : "bg-purple-500 shadow-[0_0_45px_rgba(180,0,255,0.9)]"
                    }`}
                  />

                  {/* DATE */}
                  <div className="absolute left-1/2 translate-x-10 -top-6 text-cyan-300 text-sm font-semibold">
                    {new Date(e.date).toLocaleString()}
                  </div>

                  {/* CARD */}
                  <div
                    className={`w-[720px] rounded-[32px] p-8 bg-black/70 border border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.35)]
                      ${i % 2 === 0 ? "ml-[calc(50%+40px)]" : "mr-[calc(50%+40px)]"}
                    `}
                  >
                    <h3 className="text-3xl font-bold text-cyan-300">{e.title}</h3>
                    <p className="text-xl text-white/80 mt-1">{e.agency}</p>

                    <div className="mt-6 space-y-2 text-lg">
                      <div>🚀 Vehicle: <b>{e.vehicle}</b></div>
                      <div>🛰 Mission: <b>{e.mission}</b></div>
                      <div>🌍 Destination: <b>{e.destination}</b></div>
                      <div>📍 Site: <b>{e.site}</b></div>
                    </div>

                    <p className="mt-6 text-white/80">{e.description}</p>

                    {e.is_now && (
                      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/15 border border-green-400 text-green-300 font-semibold">
                        🟢 You are here — current moment in space exploration
                      </div>
                    )}

                    {e.source_url && (
                      <a href={e.source_url} target="_blank" className="inline-block mt-6 text-cyan-300 underline text-sm">
                        Learn more
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================= FILTER SELECT ================= */
function FilterSelect({ label, value, setValue, options }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold tracking-widest text-white/70">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={e => setValue(e.target.value)}
          className="appearance-none bg-[#06162A] text-white border border-cyan-400/30 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {options.map(o => (
            <option key={o} value={o} className="bg-[#020B17] text-white">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-300 pointer-events-none" />
      </div>
    </div>
  );
}
