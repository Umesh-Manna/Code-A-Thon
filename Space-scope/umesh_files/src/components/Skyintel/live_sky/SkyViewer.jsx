import { useMemo } from "react";

const OBSERVER_LOCATION = {
  lat: 19.0760,
  lon: 72.8777
};

const SkyViewer = ({ target, time }) => {
  const stellariumUrl = useMemo(() => {
    const params = new URLSearchParams({
      target: target,
      fov: "20",
      tracking: "true",
      constellations: "true",
      ground: "false",
      atmosphere: "false",
      lat: OBSERVER_LOCATION.lat,
      lon: OBSERVER_LOCATION.lon
    });

    if (time) {
      params.set("time", time);
    }

    return `https://stellarium-web.org/?${params.toString()}`;
  }, [target, time]);

  return (
    <iframe
      title="Stellarium Sky Viewer"
      src={stellariumUrl}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        backgroundColor: "#000"
      }}
      allow="fullscreen"
    />
  );
};

export default SkyViewer;
