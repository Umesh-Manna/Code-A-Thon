const ObjectCard = ({ object }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700 hover:border-cyan-400 transition">

      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${object.image})` }}
      >
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
        <span className="absolute bottom-2 right-2 text-xs text-slate-200">
          Click to open
        </span>
      </div>

      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-sm text-slate-400">{object.code}</h3>
          <h2 className="text-lg font-semibold">{object.name}</h2>
        </div>

        <span className="inline-block text-xs px-2 py-1 rounded bg-slate-700">
          {object.type}
        </span>

        <div className="flex gap-2 pt-3">
          <button className="flex-1 text-sm py-1.5 rounded bg-white text-black hover:bg-slate-200">
            Open
          </button>
          <button className="flex-1 text-sm py-1.5 rounded bg-green-500 hover:bg-green-600">
            Notify Me
          </button>
        </div>
      </div>

    </div>
  );
};

export default ObjectCard;
