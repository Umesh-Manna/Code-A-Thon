import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Skywatch_nav = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  return (
    <nav className="w-[calc(100vw-80px)] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 px-6 py-4">
      <div className="w-full flex items-center gap-3">
        {/* ================= SEARCH BAR ================= */}
        <div className="relative flex-shrink-0 w-64">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-slate-800/50 text-white placeholder-gray-400 rounded-full px-4 py-2 pr-10 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* ================= NAVIGATION BUTTONS ================= */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/hurricanes')}
            className="bg-slate-800/60 hover:bg-slate-700/80 active:bg-slate-700 text-white px-5 py-2 rounded-lg border border-slate-600 transition-all duration-200 font-medium whitespace-nowrap text-sm"
          >
            Hurricanes
          </button>

          <button
            onClick={() => navigate('/interactive-maps')}
            className="bg-slate-800/60 hover:bg-slate-700/80 active:bg-slate-700 text-white px-5 py-2 rounded-lg border border-slate-600 transition-all duration-200 font-medium whitespace-nowrap text-sm"
          >
            Interactive Maps
          </button>

          <button
            onClick={() => navigate('/environment')}
            className="bg-slate-800/60 hover:bg-slate-700/80 active:bg-slate-700 text-white px-5 py-2 rounded-lg border border-slate-600 transition-all duration-200 font-medium whitespace-nowrap text-sm"
          >
            Our Environment
          </button>
        </div>

        {/* ================= NOTIFICATION ================= */}
        <button
          className="ml-auto flex items-center gap-2 bg-slate-800/60 hover:bg-slate-700/80 active:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 transition-all duration-200 font-medium whitespace-nowrap text-sm"
        >
          <Bell className="w-4 h-4 text-red-400" />
          <span>Notification</span>
        </button>
      </div>
    </nav>
  );
};

export default Skywatch_nav;
