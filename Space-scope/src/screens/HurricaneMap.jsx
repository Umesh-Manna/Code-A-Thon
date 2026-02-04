import MapView from "../components/MapView";
import "../components/map.css";

export default function HurricaneMap() {
  return (
    <div className="hurricane-page">
      <header className="header">
        <h1>Global Hurricane Tracker</h1>
        <p>Real-time tropical cyclones around the world</p>
      </header>

      <MapView />
    </div>
  );
}
