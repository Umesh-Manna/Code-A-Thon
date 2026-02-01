// src/Solar_data/components/SectionLayout.jsx

import "./SectionLayout.css";

export default function SectionLayout({
  title,
  description,
  attribution,
  children,
  legend = null,
  notes = null,
}) {
  return (
    <section className="solar-section">
      {/* Title */}
      <h1 className="solar-section__title">{title}</h1>

      <div className="solar-divider" />

      {/* Description */}
      <p className="solar-section__description">{description}</p>

      <div className="solar-divider" />

      {/* Attribution */}
      <p className="solar-section__attribution">{attribution}</p>

      {/* Visualization */}
      <div className="solar-section__visual">
        {children}
      </div>

      {/* Optional Legend */}
      {legend && (
        <div className="solar-section__legend">
          {legend}
        </div>
      )}

      {/* Optional Notes */}
      {notes && (
        <>
          <div className="solar-divider" />
          <div className="solar-section__notes">
            {notes}
          </div>
        </>
      )}
    </section>
  );
}
