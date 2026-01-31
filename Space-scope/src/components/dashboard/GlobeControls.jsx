export default function GlobeControls({
  autoRotate, setAutoRotate,
  showFires, setShowFires,
  isNight, setIsNight,
  showClouds, setShowClouds,
  showBoundaries, setShowBoundaries,
  resetCamera
}) {
  const btnClass = "px-3 py-1.5 rounded-md bg-black/70 border border-white/20 text-[10px] text-white uppercase tracking-wider hover:bg-white/10 transition-all pointer-events-auto text-left";

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      <button onClick={() => setAutoRotate(!autoRotate)} className={btnClass}>
        {autoRotate ? "⏸ Pause Rotation" : "▶ Rotate"}
      </button>

      <button onClick={() => setIsNight(!isNight)} className={btnClass}>
        {isNight ? "☀️ Switch to Day" : "🌙 Switch to Night"}
      </button>

      <button onClick={() => setShowClouds(!showClouds)} className={btnClass}>
        {showClouds ? "☁️ Hide Clouds" : "☁️ Show Clouds"}
      </button>

      <button onClick={() => setShowBoundaries(!showBoundaries)} className={btnClass}>
        {showBoundaries ? "🗺 Hide Borders" : "🗺 Show Borders"}
      </button>

      <button onClick={() => setShowFires(!showFires)} className={btnClass}>
        {showFires ? "🔥 Hide Fires" : "🔥 Show Fires"}
      </button>

      <button onClick={resetCamera} className="mt-2 px-3 py-1.5 rounded-md bg-cyan-500/20 border border-cyan-400 text-[10px] text-cyan-400 uppercase pointer-events-auto hover:bg-cyan-500/40">
        🔄 Reset View
      </button>
    </div>
  );
}