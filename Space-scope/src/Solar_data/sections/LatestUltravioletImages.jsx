// src/Solar_data/sections/LatestUltravioletImages.jsx

import React from "react";
import SectionLayout from "../components/SectionLayout";
import useSolarData from "../hooks/useSolarData";
import "./LatestUltravioletImages.css";

import Navbar from "../../components/Skyintel/Navbar/Navbar";
import Sidebar from "../../components/Sidebar";


const LatestUltravioletImages = () => {
  const { data, loading, error } = useSolarData("/solar/ultraviolet");

  if (loading) {
    return <p>Loading latest ultraviolet images…</p>;
  }

  if (error || !data) {
    return <p>Failed to load solar ultraviolet data.</p>;
  }

  return (
    <SectionLayout
      title="Latest Ultraviolet Images of the Sun"
      description="These ultraviolet images show the Sun across multiple wavelengths, revealing different layers of its atmosphere—from the lower corona to extremely hot flare regions."
      attribution="Source: NASA / SDO (AIA) — images cached locally for demo stability"
      notes={
        <>
          <h3>Each Wavelength Reveals Unique Features</h3>
          <ul>
            <li>
              <strong>91 Å:</strong> Extremely hot plasma in solar flares,
              highlighting the most energetic regions of the Sun’s corona
            </li>
            <li>
              <strong>131 Å:</strong> Very high-temperature plasma associated
              with intense solar flares and active regions
            </li>
            <li>
              <strong>171 Å:</strong> Detailed view of the lower corona, showing
              magnetic loops and dynamic solar structures
            </li>
            <li>
              <strong>193 Å:</strong> Hot corona and coronal holes, often linked
              to solar wind streams and space weather effects
            </li>
            <li>
              <strong>211 Å:</strong> Higher-temperature coronal structures,
              emphasizing active regions and coronal heating
            </li>
            <li>
              <strong>304 Å:</strong> Cooler plasma in the chromosphere,
              revealing solar prominences and filament structures
            </li>
          </ul>

          <p>
            The Sun rotates in a fascinating way—its equator spins faster than
            its poles, taking about <strong>25 days</strong> to complete a
            rotation at the equator and around <strong>35 days</strong> near
            the poles. This differential rotation twists and stresses the Sun’s
            magnetic field over time.
          </p>

          <p>
            As a result, magnetic energy builds up and drives solar activity
            such as sunspots, solar flares, coronal loops, and prominences.
            Even over just a few days, subtle changes can be observed in these
            features, revealing how dynamic and constantly evolving our
            closest star truly is.
          </p>
        </>
      }
    >
      <div className="uv-grid">
        {data.images.map((img) => (
          <figure key={img.wavelength} className="uv-item">
            <img
              src={img.url}
              alt={`Solar image at ${img.wavelength}`}
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
