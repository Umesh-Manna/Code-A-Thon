// src/Solar_data/sections/LatestUltravioletImages.jsx

import React from "react";
import SectionLayout from "../components/SectionLayout";
// import useSolarData from "../hooks/useSolarData";
import SolarLayout from "../components/SolarLayout";
import "./LatestUltravioletImages.css";

// Import static images (Vite will bundle them)
import img91 from "/solar/uv_91.png";
import img131 from "/solar/uv_131.png";
import img171 from "/solar/uv_171.png";
import img193 from "/solar/uv_193.png";
import img211 from "/solar/uv_211.png";
import img304 from "/solar/uv_304.png";

const UV_IMAGES = [
  {
    wavelength: "91 Å",
    url: img91,
    description: "Extremely hot plasma from intense solar flares",
  },
  {
    wavelength: "131 Å",
    url: img131,
    description: "High-temperature flare regions and active events",
  },
  {
    wavelength: "171 Å",
    url: img171,
    description: "Lower corona with magnetic loop structures",
  },
  {
    wavelength: "193 Å",
    url: img193,
    description: "Hot corona and dark coronal holes",
  },
  {
    wavelength: "211 Å",
    url: img211,
    description: "Active coronal structures at multi-million °C",
  },
  {
    wavelength: "304 Å",
    url: img304,
    description: "Chromosphere and solar prominences",
  },
];

const LatestUltravioletImages = () => {
  return (
    <SectionLayout
      title="Latest Ultraviolet Images of the Sun"
      description="Ultraviolet observations of the Sun across multiple wavelengths, each highlighting a different temperature band and atmospheric layer—from the chromosphere to the hot corona."
      attribution="Source: NASA / SDO (AIA) — static demo images"
      notes={
        <>
          <h3>Each Wavelength Reveals Unique Features</h3>
          <ul>
            {UV_IMAGES.map((img) => (
              <li key={img.wavelength}>
                <strong>{img.wavelength}:</strong> {img.description}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <div className="uv-grid">
        {UV_IMAGES.map((img) => (
          <figure key={img.wavelength} className="uv-item">
            <img
              src={img.url}
              alt={`Solar ultraviolet image at ${img.wavelength}`}
              loading="lazy"
            />
            <figcaption>{img.wavelength}</figcaption>
          </figure>
        ))}
      </div>
    </SectionLayout>
  );
};

export default LatestUltravioletImages;
