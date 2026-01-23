import React from "react";
import "./../../../styles/Skyintel/Solar_activity/sun/uv-section.css";
import UVImageGrid from "../../../components/Skyintel/Solar_activity/uv/UVImageGrid";
import WavelengthInfo from "../../../components/Skyintel/Solar_activity/uv/WavelengthInfo";



const SunUVSection = () => {
  return (
    <section className="sun-uv-section">
      {/* Section header */}
      <header className="sun-uv-header">
        <h2>Latest Ultra-Violet Images of the Sun</h2>
        <p>
          These are the latest images from the GOES-19 Solar Ultra-Violet Imager
          (SUVI), which captures the Sun in extreme ultraviolet wavelengths,
          revealing different layers of the solar atmosphere.
        </p>
      </header>

      {/* UV image grid (LIVE DATA) */}
      <div className="sun-uv-grid-wrapper">
        <UVImageGrid />
      </div>

      {/* Scientific wavelength explanation */}
      <WavelengthInfo />
    </section>
  );
};

export default SunUVSection;
