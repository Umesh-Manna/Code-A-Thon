// import React, { useEffect, useRef, useState } from "react";
// import GlobeGL from "globe.gl";
// import * as THREE from "three";
// import GlobeControls from "./GlobeControls";

// export default function Globe() {
//   const globeRef = useRef(null);
//   const globe = useRef(null);
//   const rafRef = useRef(null);

//   const issPrev = useRef(null);
//   const issCurr = useRef(null);

//   const [autoRotate, setAutoRotate] = useState(true);
//   const [showFires, setShowFires] = useState(true);
//   const [fires, setFires] = useState([]);

//   /* ----------------------------------
//      INIT GLOBE (ONCE)
//   ---------------------------------- */
//   useEffect(() => {
//     if (globe.current) return;

//     globe.current = GlobeGL()(globeRef.current)
//       .globeImageUrl(
//         "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
//       )
//       .bumpImageUrl(
//         "//unpkg.com/three-globe/example/img/earth-topology.png"
//       )
//       .backgroundColor("#000")
//       .showAtmosphere(true)
//       .atmosphereColor("#3a228a")
//       .atmosphereAltitude(0.25);

//    globe.current.pointOfView(
//   { lat: 20, lng: 0, altitude: 2.2 },
//   0
// );


//     const controls = globe.current.controls();
//     controls.enableZoom = false;
//     controls.enablePan = false;
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 0.3;

//     globe.current.scene().add(new THREE.AmbientLight(0x888888));

//     const sun = new THREE.DirectionalLight(0xffffff, 1.1);
//     sun.position.set(5, 3, 5);
//     globe.current.scene().add(sun);
//   }, []);

//   /* ----------------------------------
//      ROTATION TOGGLE
//   ---------------------------------- */
//   useEffect(() => {
//     if (!globe.current) return;
//     globe.current.controls().autoRotate = autoRotate;
//   }, [autoRotate]);

//   /* ----------------------------------
//      FETCH ISS
//   ---------------------------------- */
//   useEffect(() => {
//     const fetchISS = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/iss/live");
//         const data = await res.json();

//         if (
//           typeof data?.lat !== "number" ||
//           typeof data?.lng !== "number"
//         ) {
//           return;
//         }

//         issPrev.current = issCurr.current || data;
//         issCurr.current = data;
//       } catch (e) {
//         console.error("ISS fetch error", e);
//       }
//     };

//     fetchISS();
//     const id = setInterval(fetchISS, 4000);
//     return () => clearInterval(id);
//   }, []);

//   /* ----------------------------------
//      FETCH FIRES
//   ---------------------------------- */
//   useEffect(() => {
//     const fetchFires = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/fires");
//         const data = await res.json();

//         if (!Array.isArray(data)) return;

//         const safe = data.filter(
//           f =>
//             typeof f.lat === "number" &&
//             typeof f.lng === "number" &&
//             isFinite(f.lat) &&
//             isFinite(f.lng)
//         );

//         setFires(safe);
//       } catch (e) {
//         console.error("Fire fetch error", e);
//       }
//     };

//     fetchFires();
//     const id = setInterval(fetchFires, 60000);
//     return () => clearInterval(id);
//   }, []);

//   /* ----------------------------------
//      ANIMATION LOOP (ISS + FIRES)
//   ---------------------------------- */
//   useEffect(() => {
//     if (!globe.current) return;

//     let t = 0;

//     const animate = () => {
//       rafRef.current = requestAnimationFrame(animate);

//       if (!issPrev.current || !issCurr.current) return;

//       t = Math.min(t + 0.02, 1);

//       const lat =
//         issPrev.current.lat +
//         (issCurr.current.lat - issPrev.current.lat) * t;

//       const lng =
//         issPrev.current.lng +
//         (issCurr.current.lng - issPrev.current.lng) * t;

//       const points = [];

//       // ISS point
//       points.push({
//         lat,
//         lng,
//         size: 0.6,
//         color: "#00BFFF",
//         label: "🛰 ISS"
//       });

//       // Fire points (SAFE)
//       if (showFires && Array.isArray(fires)) {
//         fires.forEach(f => {
//           points.push({
//             lat: f.lat,
//             lng: f.lng,
//             size: 0.35,
//             color: "orange"
//           });
//         });
//       }

//       // 🚨 ABSOLUTE SAFETY
//       globe.current.pointsData(Array.isArray(points) ? points : []);
//     };

//     animate();
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [fires, showFires]);

//   /* ----------------------------------
//      RENDER
//   ---------------------------------- */

// return (
//   <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black">
// <div
//   ref={globeRef}
//   className="absolute inset-0"
//   style={{
//     transform: "translateX(-12%)",
//     width: "180%",
//     height: "100%"
//   }}
// />


//     <GlobeControls
//       autoRotate={autoRotate}
//       setAutoRotate={setAutoRotate}
//       showFires={showFires}
//       setShowFires={setShowFires}
//       resetCamera={() =>
//   globe.current?.pointOfView(
//     { lat: 20, lng: 0, altitude: 2.2 },
//     1000
//   )
// }

//     />
//   </div>
// );
// }

import React, { useEffect, useRef, useState } from "react";
import GlobeGL from "globe.gl";
import * as THREE from "three";
import GlobeControls from "./GlobeControls";

export default function Globe() {
  const globeRef = useRef(null);
  const globe = useRef(null);
  const cloudsRef = useRef(null);
  const rafRef = useRef(null);

  const issPrev = useRef(null);
  const issCurr = useRef(null);

  // States
  const [autoRotate, setAutoRotate] = useState(true);
  const [showFires, setShowFires] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [showClouds, setShowClouds] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);

  const [fires, setFires] = useState([]);
  const [countries, setCountries] = useState([]);

  /* ================================
     1. INIT GLOBE
  ================================= */
  useEffect(() => {
    if (!globeRef.current) return;

    globe.current = GlobeGL({ rendererConfig: { alpha: true } })(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#3a4cff")
      .atmosphereAltitude(0.15)
      
      /* --- BORDER & HOVER UPGRADES --- */
      .polygonAltitude(0.01) // Base height
      .polygonCapColor(() => "rgba(0, 229, 255, 0.1)") // Transparent cyan fill
      .polygonSideColor(() => "rgba(0, 0, 0, 0)")
      .polygonStrokeColor(() => "#00e5ff") // Cyan outline
      .polygonLabel(({ properties: d }) => `
        <div style="background: rgba(0,0,0,0.9); color: white; padding: 10px; border: 1px solid #00e5ff; border-radius: 8px; font-family: sans-serif; box-shadow: 0 0 10px rgba(0,229,255,0.5);">
          <b style="color: #00e5ff; font-size: 14px;">${d.ADMIN || d.NAME}</b><br/>
          <span style="font-size: 10px; opacity: 0.8;">Satellite Reconnaissance Active</span>
        </div>
      `)
      // This makes the country "lift" when you hover
      .onPolygonHover(hoverD => globe.current.polygonAltitude(d => d === hoverD ? 0.06 : 0.01));

    // --- ADD CLOUDS (With Mouse Block Fix) ---
    new THREE.TextureLoader().load("//unpkg.com/three-globe/example/img/earth-clouds.png", cloudsTexture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.current.getGlobeRadius() * 1.008, 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true, opacity: 0.4 })
      );
      
      // IMPORTANT: This prevents the clouds from stealing mouse clicks/hovers
      clouds.raycast = () => null; 
      
      globe.current.scene().add(clouds);
      cloudsRef.current = clouds;
    });

    // Resize Handler
    const handleResize = () => {
      if (globe.current && globeRef.current) {
        const { width, height } = globeRef.current.getBoundingClientRect();
        globe.current.width(width).height(height);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    globe.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
    globe.current.controls().enableZoom = true;

    // Lighting
    globe.current.scene().add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(1, 1, 1);
    globe.current.scene().add(sun);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================================
     2. DYNAMIC STATE SYNC
  ================================= */
  useEffect(() => {
    if (!globe.current) return;
    globe.current.globeImageUrl(isNight 
      ? "//unpkg.com/three-globe/example/img/earth-night.jpg" 
      : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );
  }, [isNight]);

  useEffect(() => {
    if (cloudsRef.current) cloudsRef.current.visible = showClouds;
  }, [showClouds]);

  useEffect(() => {
    if (!globe.current) return;
    // Apply boundaries
    globe.current.polygonsData(showBoundaries ? countries : []);
  }, [showBoundaries, countries]);

  /* ================================
     3. DATA FETCHING (Correct URLs)
  ================================= */
  useEffect(() => {
    // Correct URL for Boundaries
    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        console.log("Countries Loaded:", data.features.length);
        setCountries(data.features);
      })
      .catch(err => console.error("Data Load Error:", err));

    const fetchISS = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/iss/live");
        const data = await res.json();
        if (data?.lat) { issPrev.current = issCurr.current || data; issCurr.current = data; }
      } catch (e) {}
    };
    fetchISS();
    const id = setInterval(fetchISS, 4000);
    return () => clearInterval(id);
  }, []);

  /* ================================
     4. ANIMATION LOOP
  ================================= */
  useEffect(() => {
    if (!globe.current) return;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (cloudsRef.current && showClouds) cloudsRef.current.rotation.y += 0.0003;

      if (!issCurr.current) return;
      const pts = [{ lat: issCurr.current.lat, lng: issCurr.current.lng, size: 0.8, color: "#ffffff", label: "ISS LIVE" }];
      // Add Fires/Stations... (Your existing logic)
      globe.current.pointsData(pts);
    };
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [fires, showFires, showClouds]);

  useEffect(() => { if (globe.current) globe.current.controls().autoRotate = autoRotate; }, [autoRotate]);

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center rounded-2xl border border-cyan-400/20 bg-black overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40" style={{ zIndex: 1 }}>
        <source src="/images/starsanimation.mp4" type="video/mp4" />
      </video>
      <div ref={globeRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 10, cursor: 'crosshair' }} />
      <div className="absolute inset-0 z-20 pointer-events-none">
        <GlobeControls
          autoRotate={autoRotate} setAutoRotate={setAutoRotate}
          showFires={showFires} setShowFires={setShowFires}
          isNight={isNight} setIsNight={setIsNight}
          showClouds={showClouds} setShowClouds={setShowClouds}
          showBoundaries={showBoundaries} setShowBoundaries={setShowBoundaries}
          resetCamera={() => globe.current?.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 1000)}
        />
      </div>
    </div>
  );
}