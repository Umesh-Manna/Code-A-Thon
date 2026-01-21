import { useNavigate } from "react-router-dom";

const ObjectCard = ({ object }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (object.id === "c50") {
      navigate("/skyintel/live_sky/ObjectView");
    }
  };

  return (
    <div className="object-card">

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
          <button
            className="btn-open"
            onClick={handleOpen}
            disabled={object.id !== "c50"}
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
