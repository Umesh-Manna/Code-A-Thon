import React from "react";

const UVImageCard = ({
  wavelength,
  label,
  description,
  imageUrl,
  timestamp,
  isLoading,
}) => {
  return (
    <div className="uv-image-card">
      <div className="uv-image-wrapper">
        {isLoading || !imageUrl ? (
          <div className="uv-image-placeholder">
            Loading {wavelength} Å…
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Sun in ${wavelength} Å wavelength`}
            loading="lazy"
          />
        )}
      </div>

      <div className="uv-image-meta">
        <h4>{wavelength} Å</h4>
        <span className="uv-label">{label}</span>

        {timestamp && (
          <span className="uv-timestamp">
            {timestamp}
          </span>
        )}
      </div>

      <p className="uv-description">
        {description}
      </p>
    </div>
  );
};

export default UVImageCard;
