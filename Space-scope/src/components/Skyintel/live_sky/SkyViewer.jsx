import { useRef, useEffect } from "react";

const STELLARIUM_SCRIPT_ID = "stellarium-engine-script";

const SkyViewer = () => {
  const engineRootRef = useRef(null);

  useEffect(() => {
    const existingScript = document.getElementById(STELLARIUM_SCRIPT_ID);

    if (existingScript) {
      console.log("[SkyViewer] Stellarium script already present");
      return;
    }

    const script = document.createElement("script");
    script.id = STELLARIUM_SCRIPT_ID;
    script.src = "/stellarium/stellarium.js";
    script.async = true;

    script.onload = () => {
      console.log("[SkyViewer] Stellarium script loaded");

      if (window.Stellarium) {
        console.log("[SkyViewer] Stellarium global detected");
      } else {
        console.warn(
          "[SkyViewer] Script loaded, but no Stellarium engine detected (expected in scaffold mode)"
        );
      }
    };

    script.onerror = () => {
      console.error("[SkyViewer] Failed to load stellarium.js");
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        backgroundColor: "#000",
        overflow: "hidden"
      }}
    >
      <div
        ref={engineRootRef}
        id="stellarium-engine-root"
        style={{
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
};

export default SkyViewer;
