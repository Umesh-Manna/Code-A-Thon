import React from "react";
import SectionLayout from "../components/SectionLayout";
import "./CurrentSolarActivityOverview.css";

const CurrentSolarActivityOverview = () => {
  return (
    <SectionLayout
      title="Current Solar Activity Overview"
      description={
        <>
          Here’s an overview of current solar activities, including solar flares,
          limb features, coronal holes, prominences, filaments, and bright
          regions. Each of these phenomena represents different aspects of the
          Sun’s dynamic behavior.
        </>
      }
      attribution="Geostationary Operational Environmental Satellite-19 info @ NOAA / NASA (cached locally)"
      notes={
        <ul className="solar-activity-notes">
          <li>
            <strong>Solar flares:</strong> Intense bursts of energy and radiation
            that can impact space weather.
          </li>
          <li>
            <strong>Limb:</strong> The edge or outer boundary of the Sun, where
            features like prominences are visible.
          </li>
          <li>
            <strong>Coronal holes:</strong> Areas on the Sun’s corona with lower
            density and temperature, often associated with high-speed solar
            wind.
          </li>
          <li>
            <strong>Prominences:</strong> Large, bright features extending
            outward from the Sun’s surface, often in a loop shape.
          </li>
          <li>
            <strong>Filaments:</strong> Dark, dense structures seen against the
            Sun’s brighter background, typically associated with magnetic
            activity.
          </li>
          <li>
            <strong>Bright regions:</strong> Areas on the Sun’s surface that are
            hotter and more active, often linked to sunspots or active regions.
          </li>
        </ul>
      }
    >
      <div className="solar-activity-visual">
        {/* Main Thematic Map */}
        <img
          src="/solar/solar_activity_thematic_map.png"
          alt="Current solar activity thematic map showing flares, coronal holes, prominences, and bright regions"
          className="solar-activity-image"
          loading="lazy"
        />

        {/* Legend */}
        <div className="solar-activity-legend">
          <div><span className="legend-color flare" /> Flare</div>
          <div><span className="legend-color limb" /> Limb</div>
          <div><span className="legend-color quiet" /> Quiet Sun</div>
          <div><span className="legend-color coronal-hole" /> Coronal Hole</div>
          <div><span className="legend-color prominence" /> Prominence</div>
          <div><span className="legend-color filament" /> Filament</div>
          <div><span className="legend-color bright" /> Bright Region</div>
          <div><span className="legend-color unlabeled" /> Unlabeled</div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default CurrentSolarActivityOverview;
