const MoonVisual = ({ illumination, waxing }) => {
  const phaseOffset = waxing
    ? 50 - illumination / 2
    : 50 + illumination / 2;

  return (
    <svg width="160" height="160" viewBox="0 0 100 100">
      {/* Full moon */}
      <circle cx="50" cy="50" r="45" fill="#e5e5e5" />

      {/* Shadow */}
      <ellipse
        cx={phaseOffset}
        cy="50"
        rx="45"
        ry="45"
        fill="#0b0b12"
      />

      {/* Glow */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#ffffff20"
        strokeWidth="2"
      />
    </svg>
  );
};

export default MoonVisual;
