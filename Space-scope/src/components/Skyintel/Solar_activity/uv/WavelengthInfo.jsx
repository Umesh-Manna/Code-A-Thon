import React from "react";
import wavelengths from "../../../../data/Solar_activity/wavelengths";

const WavelengthInfo = () => {
  return (
    <div className="wavelength-info">
      <h3>Each wavelength reveals unique features:</h3>

      <ul className="wavelength-info-list">
        {wavelengths.map((wave) => (
          <li key={wave.wavelength}>
            <strong>{wave.wavelength} Å:</strong> {wave.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WavelengthInfo;
