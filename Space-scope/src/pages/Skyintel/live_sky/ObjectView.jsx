import { useEffect } from "react";
import SkyViewer from "../../../components/Skyintel/live_sky/SkyViewer";
import {
  createEngine,
  destroyEngine,
  setTarget,
  setFov
} from "../../../utils/Skyintel/live_sky/stellariumEngine";

const ObjectView = () => {
  useEffect(() => {
    const mountNode = document.getElementById(
      "stellarium-engine-root"
    );
    if (!mountNode) return;

    // Create engine (skeleton)
    createEngine(mountNode);

    // Issue initial commands
    setTarget("NGC 2244"); // Caldwell 50
    setFov(60);

    return () => {
      destroyEngine();
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#020617",
        color: "#ffffff",
        overflow: "hidden"
      }}
    >
      {/* Left panel */}
      <div
        style={{
          width: "320px",
          minWidth: "320px",
          borderRight: "1px solid #1e293b",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        <h2 style={{ margin: "0 0 12px" }}>Caldwell 50</h2>
        <p style={{ margin: "0 0 16px", color: "#94a3b8" }}>
          Open Cluster
        </p>

        <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
          <div>Catalog: NGC 2244</div>
          <div>Constellation: Monoceros</div>
          <div>Magnitude: ~4.8</div>
        </div>
      </div>

      {/* Sky viewer */}
      <div
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "#000000"
        }}
      >
        <SkyViewer />
      </div>
    </div>
  );
};

export default ObjectView;
