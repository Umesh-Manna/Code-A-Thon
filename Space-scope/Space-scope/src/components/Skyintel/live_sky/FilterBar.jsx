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

const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="px-6 py-4 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            onClick={() =>
              onFilterChange(isActive ? null : filter)
            }
            className={`
              px-3 py-1 rounded-full text-sm border
              transition-colors
              ${
                isActive
                  ? "border-cyan-400 text-cyan-300"
                  : "border-slate-600 text-slate-300 hover:border-cyan-400"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
