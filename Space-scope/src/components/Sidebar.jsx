import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ChevronsRight,
  ChevronsLeft,
  LayoutDashboard,
  Bell,
  Eye,
  Satellite,
  Rocket,
  Globe,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Bell, label: 'Events', path: '/events' },
    { icon: Eye, label: 'Sky Watch', path: '/skywatch' },
    { icon: Satellite, label: 'Sky Intel', path: '/skyintel' },
    { icon: Rocket, label: 'Milestones', path: '/milestones' },
    { icon: Globe, label: 'Astro Lab', path: '/astrolab' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-300 ease-in-out flex flex-col h-screen ${
          isOpen ? 'w-50' : 'w-24'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          {isOpen ? (
            <>
              <h1 className="text-2xl font-bold">
                <span className="text-cyan-400">Space</span>
                <span className="text-white">Scope.</span>
              </h1>
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-cyan-400 transition-colors"
              >
                <ChevronsLeft className="w-6 h-6" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-cyan-400 transition-colors mx-auto"
            >
              <ChevronsRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-white hover:bg-slate-700/50 transition-colors group"
                >
                  <item.icon className="w-6 h-6 flex-shrink-0 group-hover:text-cyan-400 transition-colors" />
                  {isOpen && (
                    <span className="text-lg font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-slate-700 p-6 space-y-4">
          {isOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center overflow-hidden">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23ef4444'/%3E%3C/svg%3E"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-lg font-medium">
                  Yugal Mahajan
                </span>
              </div>
              <button
                onClick={() => navigate('/logout')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-slate-600 rounded-lg text-white hover:bg-slate-700/50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-medium">Logout</span>
              </button>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mx-auto overflow-hidden">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23ef4444'/%3E%3C/svg%3E"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => navigate('/logout')}
                className="w-12 h-12 border-2 border-slate-600 rounded-lg text-white hover:bg-slate-700/50 transition-colors flex items-center justify-center mx-auto"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
