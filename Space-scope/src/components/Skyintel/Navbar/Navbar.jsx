import { NavLink } from "react-router-dom";
import "../../../styles/Skyintel/navbar.css";

export default function Navbar() {
  return (
    <nav className="skyintel-navbar">
      <div className="navbar-left">
        <span className="brand">SkyIntel</span>

        <div className="nav-buttons">
          <NavLink to="/solar-activity" className="nav-btn">
            Real-time Solar Activity
          </NavLink>

          <NavLink to="/lunar-eclipse" className="nav-btn">
            Lunar Eclipse
          </NavLink>

          <NavLink to="/live-sky" className="nav-btn">
            Live sky positions
          </NavLink>

          <NavLink to="/tonights-best" className="nav-btn">
            Tonight’s Best
          </NavLink>

          <NavLink to="/skyintel/satellite" className="nav-btn">
            Satellites
          </NavLink>
        </div>
      </div>

      <div className="navbar-right">
        <NavLink to="/notifications" className="nav-btn notification-btn">
          🔔 Notification
        </NavLink>
      </div>
    </nav>
  );
}
