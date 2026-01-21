const ObjectCard = ({ object }) => {
  return (
    <div className="object-card">

      {/* Image placeholder */}
      <div className="object-card-image">
        Image Placeholder
      </div>

      <div className="object-card-content">
        <div className="object-code">{object.code}</div>
        <div className="object-name">{object.name}</div>

        <div className="object-type">
          {object.type}
        </div>

        <div className="object-card-actions">
          <button className="btn-open">
            Open
          </button>
          <button className="btn-notify">
            Notify Me
          </button>
        </div>
      </div>

    </div>
  );
};

export default ObjectCard;
