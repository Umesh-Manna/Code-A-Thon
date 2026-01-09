// import React, { useEffect, useRef } from "react";
// import Globe from "globe.gl";
// import { feature } from "topojson-client";

// const OWM_KEY = "d72417c178e7e0e19db8fd0788f2789d";
// const FIRMS_KEY = "1661f6cde721dc42f0a179495ac4a842";

// const GlobeComponent = () => {
//   const globeRef = useRef(null);

//   useEffect(() => {
//     const globe = Globe()(globeRef.current)
//       .width(900)
//       .height(600)
//       .backgroundColor("rgba(0,0,0,0)")
//       .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
//       .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
//       .showAtmosphere(true)
//       .atmosphereColor("#66ccff")
//       .atmosphereAltitude(0.20);

//     globe.controls().autoRotate = true;
//     globe.controls().autoRotateSpeed = 0.45;

//     // -------- COUNTRY BORDERS ----------
//     fetch("https://unpkg.com/world-atlas/countries-110m.json")
//       .then((res) => res.json())
//       .then((worldData) => {
//         const countries = feature(
//           worldData,
//           worldData.objects.countries
//         ).features;

//         globe
//           .polygonsData(countries)
//           .polygonStrokeColor(() => "#00eaff")
//           .polygonCapColor(() => "rgba(0,150,255,0.15)")
//           .polygonSideColor(() => "rgba(0,150,255,0.05)")
//           .polygonLabel(({ properties }) => `<b>${properties.name}</b>`);
//       });

//     // -------- FIRES ----------
//     const loadFires = async () => {
//       try {
//         const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_KEY}/VIIRS_SNPP_NRT/world/24`;
//         const res = await fetch(url);
//         const csv = await res.text();

//         const rows = csv.split("\n").slice(1);
//         const fires = rows
//           .map((r) => r.split(","))
//           .filter((r) => r.length > 1)
//           .map((c) => ({
//             lat: +c[0],
//             lng: +c[1],
//             intensity: +c[11],
//           }));

//         globe
//           .pointsData(fires)
//           .pointAltitude(() => 0.015)
//           .pointColor(() => "rgba(255,120,0,0.95)")
//           .pointRadius(0.85);
//       } catch (e) {
//         console.error("Fire data error:", e);
//       }
//     };

//     loadFires();

//     // -------- CYCLONES ----------
//     const loadCyclones = async () => {
//       try {
//         const res = await fetch("https://www.nhc.noaa.gov/CurrentStorms.json");
//         const data = await res.json();

//         const storms = data.activeStorms.map((s) => ({
//           lat: +s.lat,
//           lng: +s.lon,
//           name: s.name,
//         }));

//         globe
//           .labelsData(storms)
//           .labelLat((d) => d.lat)
//           .labelLng((d) => d.lng)
//           .labelText((d) => `🌀 ${d.name}`)
//           .labelSize(1.3)
//           .labelColor(() => "#00eaff");
//       } catch (e) {
//         console.error("Cyclone data error:", e);
//       }
//     };

//     loadCyclones();
//   }, []);

//   return <div ref={globeRef} className="w-full h-[600px]" />;
// };

// export default GlobeComponent;



// import React, { useEffect, useRef } from "react";
// import Globe from "globe.gl";
// import { feature } from "topojson-client";

// const FIRMS_KEY = "1661f6cde721dc42f0a179495ac4a842"; // keep quoted

// const GlobeComponent = () => {
//   const globeRef = useRef(null);

//   useEffect(() => {
//     const globe = Globe()(globeRef.current)
//       .width(900)
//       .height(650)
//       .backgroundColor("rgba(0,0,0,0)")
//       .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
//       .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
//       .showAtmosphere(false); // ❌ haze removed

//     // smooth auto rotation
//     globe.controls().autoRotate = true;
//     globe.controls().autoRotateSpeed = 0.35;

//     /* ---------------- COUNTRIES ---------------- */
//     fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const countries = feature(
//           data,
//           data.objects.countries
//         ).features;

//         globe
//           .polygonsData(countries)
//           .polygonAltitude(0.01)
//           .polygonCapColor(() => "rgba(0,180,255,0.12)")
//           .polygonSideColor(() => "rgba(0,180,255,0.05)")
//           .polygonStrokeColor(() => "#00eaff")
//           .polygonLabel(
//             ({ properties }) =>
//               `<b style="color:#00eaff">${properties.name}</b>`
//           );
//       });

//     /* ---------------- FIRE HOTSPOTS (NASA FIRMS) ---------------- */
//     const loadFires = async () => {
//       try {
//         const res = await fetch(
//           `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_KEY}/VIIRS_SNPP_NRT/world/24`
//         );
//         const csv = await res.text();

//         const fires = csv
//           .split("\n")
//           .slice(1)
//           .map((r) => r.split(","))
//           .filter((r) => r.length > 2)
//           .map((c) => ({
//             lat: +c[0],
//             lng: +c[1],
//           }));

//         globe
//           .pointsData(fires)
//           .pointAltitude(0.02)
//           .pointRadius(0.6)
//           .pointColor(() => "rgba(255,120,0,0.9)");
//       } catch (e) {
//         console.error("Fire load failed", e);
//       }
//     };
//     loadFires();


//     /* ---------------- CYCLONES (NOAA) ---------------- */
//     const loadCyclones = async () => {
//       try {
//         const res = await fetch("https://www.nhc.noaa.gov/CurrentStorms.json");
//         const data = await res.json();

//         const storms = data.activeStorms.map((s) => ({
//           lat: +s.lat,
//           lng: +s.lon,
//           name: s.name,
//         }));

//         globe
//           .labelsData(storms)
//           .labelLat((d) => d.lat)
//           .labelLng((d) => d.lng)
//           .labelText((d) => `🌀 ${d.name}`)
//           .labelSize(1.2)
//           .labelColor(() => "#00eaff");
//       } catch (e) {
//         console.error("Cyclone load failed", e);
//       }
//     };
//     loadCyclones();
// }, []);

//   return (
//     <div
//       ref={globeRef}
//       className="w-full h-[600px] rounded-2xl overflow-hidden"
//     />
//   ); 
// };
// export default GlobeComponent;

import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { feature } from "topojson-client";

const TEXTURES = {
  base: "//unpkg.com/three-globe/example/img/earth-night.jpg",
  clouds: "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/cloud_combined_2048.jpg",
  temp: "https://neo.gsfc.nasa.gov/servlet/RenderData?si=122&cs=rgb&format=PNG&width=2048&height=1024"
};

const GlobeComponent = ({ activeLayers }) => {
  const globeRef = useRef();
  const globeInstance = useRef();

  useEffect(() => {
    if (globeInstance.current) return;

    const globe = Globe()(globeRef.current)
      .width(960)
      .height(640)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl(TEXTURES.base)
      .showAtmosphere(true)
      .atmosphereColor("#00eaff")
      .atmosphereAltitude(0.12);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.25;

    globeInstance.current = globe;

    // Countries
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then(res => res.json())
      .then(worldData => {
        const countries = feature(
          worldData,
          worldData.objects.countries
        ).features;

        globe
          .polygonsData(countries)
          .polygonAltitude(0.01)
          .polygonCapColor(() => "rgba(0,180,255,0.12)")
          .polygonSideColor(() => "rgba(0,180,255,0.04)")
          .polygonStrokeColor(() => "#00eaff")
          .polygonLabel(d => `
            <div style="padding:6px 10px">
              <b>${d.properties.name}</b>
            </div>
          `);
      });
  }, []);

  /* -------- TEXTURE SWITCHING (NOAA STYLE) -------- */
  useEffect(() => {
    if (!globeInstance.current) return;

    if (activeLayers.clouds) {
      globeInstance.current.globeImageUrl(TEXTURES.clouds);
    } else if (activeLayers.temp) {
      globeInstance.current.globeImageUrl(TEXTURES.temp);
    } else {
      globeInstance.current.globeImageUrl(TEXTURES.base);
    }
  }, [activeLayers]);

  return (
    <div className="flex justify-center">
      <div ref={globeRef} />
    </div>
  );
};

export default GlobeComponent;




