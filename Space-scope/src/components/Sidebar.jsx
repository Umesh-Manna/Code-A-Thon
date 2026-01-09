import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Eye, 
  ShieldAlert, 
  Flag, 
  Globe, 
  Settings, 
  LogOut,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
    { name: 'Events', icon: <Calendar size={22} />, path: '/events' },
    { name: 'Sky Watch', icon: <Eye size={22} />, path: '/skywatch' },
    { name: 'Sky Intel', icon: <ShieldAlert size={22} />, path: '/skyintel' },
    { name: 'Milestones', icon: <Flag size={22} />, path: '/milestones' },
    { name: 'Astro Lab', icon: <Globe size={22} />, path: '/astrolab' },
    { name: 'Settings', icon: <Settings size={22} />, path: '/settings' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 flex flex-col border-r border-white/5 shadow-2xl
        ${isCollapsed ? 'w-20 bg-[#232d3f]/60 backdrop-blur-md' : 'w-52 bg-[#060B1A]'} 
      `}
    >
      {/* Header Toggle Section */}
      <div className={`flex items-center p-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
           <h1 className="text-xl font-bold tracking-tighter">
          <span className="text-[#00E6FF]">Space</span>
          <span className="text-white">Scope.</span>
          </h1>
        )}
        <button 
          onClick={onToggle}
          className="text-white/40 hover:text-white transition-all cursor-pointer p-1 rounded-md hover:bg-white/10"
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 py-3 rounded-xl transition-all duration-200 group
              ${isCollapsed ? 'justify-center' : 'px-4'}
              ${isActive ? 'bg-white/10 text-white font-medium' : 'text-white/40 hover:text-white hover:bg-white/5'}
            `}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-[14px] font-poppins">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Profile & Logout */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <div className={`flex items-center p-2 rounded-xl mb-4 ${isCollapsed ? 'justify-center' : 'gap-3 bg-black/20'}`}>
          {/* Avatar mimicking the one in your image */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 to-black border border-purple-500/50 flex-shrink-0 flex items-center justify-center">
             <span className="text-[10px] font-bold text-purple-300">YM</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-[10px] font-semibold text-white truncate">Yugal Mahajan</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className={`flex items-center justify-center border border-white/10 rounded-xl bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 transition-all cursor-pointer group
            ${isCollapsed ? 'w-12 h-12' : 'w-full py-3 gap-3'}
          `}
        >
          <LogOut size={18} className="text-white/40 group-hover:text-red-400" />
          {!isCollapsed && <span className="text-xs font-bold text-white/70 group-hover:text-red-400 tracking-[1px]">LOGOUT</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;