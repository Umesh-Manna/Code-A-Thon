import { useNavigate } from "react-router-dom";

const ObjectCard = ({ object }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/skyintel/live_sky/object/${object.id}`);
  };

  return (
    <div className="object-card">

      <div className="object-card-image">
        Image Placeholder
      </div>

      <div className="object-card-content">
        <div className="object-code">{object.code}</div>
        <div className="object-name">{object.displayName}</div>

        <div className="object-type">
          {object.type}
        </div>

        <div className="object-card-actions">
          <button
            className="btn-open"
            onClick={handleOpen}
          >
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
