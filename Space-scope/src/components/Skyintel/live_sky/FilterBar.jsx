const filters = [
  "Galaxy",
  "Nebula",
  "Cluster",
  "Star",
  "Messier",
  "Caldwell",
  "NGC",
  "Sharpless",
];

const FilterBar = () => {
  return (
    <div className="px-6 py-4 flex flex-wrap items-center gap-4">

      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-300">Latitude</label>
        <input
          type="number"
          placeholder="0.000"
          className="w-24 px-2 py-1 rounded bg-slate-700 text-white outline-none"
        />
      </div>

      <select className="px-2 py-1 rounded bg-slate-700 text-white">
        <option>All</option>
        <option>India</option>
        <option>USA</option>
      </select>

      <button className="px-3 py-1 rounded bg-slate-600 hover:bg-slate-500">
        Use my location
      </button>

      <button className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700">
        Refresh
      </button>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            className="px-3 py-1 rounded-full text-sm bg-slate-800 border border-slate-600 hover:border-cyan-400"
          >
            {f}
          </button>
        ))}
      </div>

    </div>
  );
};

export default FilterBar;
