import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

import EventSnapshot from "../components/dashboard/EventSnapshot";
import SpaceWeather from "../components/dashboard/SpaceWeather";
import MissionCard from "../components/dashboard/MissionCard";
import MoonPhase from "../components/dashboard/MoonPhase";
import SkyWeather from "../components/dashboard/SkyWeather";
import InsightCard from "../components/dashboard/InsightCard";
import EarthGlobe from "../components/dashboard/Globe";

// Umesh's imports
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={'relative min-h-screen text-white bg-black overflow-hidden'}>

      {/* 🌌 BACKGROUND (NO LAYOUT EFFECT) */}
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

        <img
          src="/images/futuristic-moon-background.jpg"
          alt="space background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      <div className={'relative z-10 flex min-h-screen ${styles.dashboardContainer}'}>

        {/* SIDEBAR (SAME AS EVENTS) */}
        <aside className="live-sky-sidebar-area">
          <div
            className={`live-sky-sidebar-content ${
              isSidebarOpen ? "expanded" : ""
            }`}
          >
            <Sidebar 
              isCollapsed={isSidebarCollapsed}
              onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className={`transition-all duration-300 flex-1 p-6 space-y-6 ${
            isSidebarCollapsed ? "ml-24" : "ml-64"
          } ${styles.mainContent}`}
        >

          {/* HEADER */}
          <h1 className="text-3xl font-bold">
            Space Scope{" "}
            <span className="text-white/60 font-medium">Real-Time</span>
          </h1>

          {/* TOP GRID */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <EventSnapshot />
            </div>

            <div className="col-span-6">
              <SpaceWeather />
            </div>

            <div className="col-span-3">
              <MissionCard />
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <MoonPhase />
            </div>

            <div className="col-span-8 h-[690px]">
              <EarthGlobe />
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <SkyWeather />
            </div>

            <div className="col-span-8">
              <InsightCard />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
