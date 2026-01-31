import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkyViewer from "../../../components/Skyintel/live_sky/SkyViewer";
import objects from "../../../data/live_sky/objects.json";

const ObjectView = () => {
  const { objectId } = useParams();
  const object = objects.find((o) => o.id === objectId);

  const [showToast, setShowToast] = useState(false);
  const [timeISO, setTimeISO] = useState(null);

  if (!object) {
    return <div style={{ color: "#fff", padding: "40px" }}>Object not found</div>;
  }

  const copyTargetToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(object.stellariumTarget);
    } catch {}
    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  /* -------- Time helpers -------- */

  const setNow = () => {
    setTimeISO(new Date().toISOString());
  };

  const setTonight = () => {
    const now = new Date();
    now.setHours(21, 0, 0, 0); // 9:00 PM local time
    setTimeISO(now.toISOString());
  };

  const addHours = (h) => {
    const base = timeISO ? new Date(timeISO) : new Date();
    base.setHours(base.getHours() + h);
    setTimeISO(base.toISOString());
  };

  const addDays = (d) => {
    const base = timeISO ? new Date(timeISO) : new Date();
    base.setDate(base.getDate() + d);
    setTimeISO(base.toISOString());
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#020617",
        color: "#ffffff"
      }}
    >
      {/* Left panel */}
      <div
        style={{
          width: "320px",
          borderRight: "1px solid #1e293b",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}
      >
        <div>
          <h2>{object.displayName}</h2>
          <p style={{ color: "#94a3b8" }}>{object.type}</p>
        </div>

        <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
          <div>Catalog: {object.stellariumTarget}</div>
          {object.constellation && <div>Constellation: {object.constellation}</div>}
          {object.magnitude && <div>Magnitude: {object.magnitude}</div>}
        </div>

        <button
          onClick={copyTargetToClipboard}
          style={{
            padding: "10px",
            backgroundColor: "#0ea5e9",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Search in Stellarium
        </button>

        {/* Time Controls */}
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontWeight: 600, marginBottom: "6px" }}>Time</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <button onClick={setNow}>Now</button>
            <button onClick={setTonight}>Tonight</button>
            <button onClick={() => addHours(1)}>+1 Hour</button>
            <button onClick={() => addDays(1)}>+1 Day</button>
          </div>
        </div>
      </div>

      {/* Sky viewer */}
      <div style={{ flex: 1 }}>
        <SkyViewer
          target={object.stellariumTarget}
          time={timeISO}
        />
      </div>

      {/* Toast */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            backgroundColor: "#020617",
            border: "1px solid #1e293b",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "13px"
          }}
        >
          <strong>Search in Stellarium</strong>
          <div>
            <code>{object.stellariumTarget}</code> copied to clipboard
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectView;
