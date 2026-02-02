import React from "react";
import SolarLayout from "../components/SolarLayout";
import SectionLayout from "../components/SectionLayout";
import useSolarData from "../hooks/useSolarData";
import "./LatestUltravioletImages.css";

const LatestUltravioletImages = () => {
  const { data, loading, error } = useSolarData("/solar/ultraviolet");

  if (loading) {
    return <p>Loading latest ultraviolet images…</p>;
  }

  if (error || !data) {
    return <p>Failed to load solar ultraviolet data.</p>;
  }

  return (
    <SolarLayout>
      <SectionLayout
        title="Latest Ultraviolet Images of the Sun"
        description="These ultraviolet images show the Sun across multiple wavelengths, revealing different layers of its atmosphere—from the lower corona to extremely hot flare regions."
        attribution="Source: NASA / SDO (AIA) — images cached locally for demo stability"
        notes={
          <>
            <h3>Each Wavelength Reveals Unique Features</h3>
            <ul>
              <li><strong>91 Å:</strong> Extremely hot plasma in solar flares</li>
              <li><strong>131 Å:</strong> High-temperature flare regions</li>
              <li><strong>171 Å:</strong> Lower corona magnetic loops</li>
              <li><strong>193 Å:</strong> Hot corona and coronal holes</li>
              <li><strong>211 Å:</strong> Active coronal structures</li>
              <li><strong>304 Å:</strong> Chromosphere and prominences</li>
            </ul>
          </>
        }
      >
        <div className="uv-grid">
          {data.images.map((img) => (
            <figure key={img.wavelength} className="uv-item">
              <img src={img.url} alt={`Solar image at ${img.wavelength}`} />
              <figcaption>{img.wavelength}</figcaption>
            </figure>
          ))}
        </div>
      </SectionLayout>
    </SolarLayout>
  );
};

export default LatestUltravioletImages;
