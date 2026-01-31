import { useNavigate } from "react-router-dom";

/* 🔹 Static image imports (REQUIRED for src/assets) */
import card1 from "../../../assets/Skyintel/Live_sky/card1.jpg";
import card2 from "../../../assets/Skyintel/Live_sky/card2.jpg";
import card3 from "../../../assets/Skyintel/Live_sky/card3.jpg";
import card4 from "../../../assets/Skyintel/Live_sky/card4.jpg";
import card5 from "../../../assets/Skyintel/Live_sky/card5.jpg";
import card6 from "../../../assets/Skyintel/Live_sky/card6.jpg";
import card7 from "../../../assets/Skyintel/Live_sky/card7.jpg";
import card8 from "../../../assets/Skyintel/Live_sky/card8.jpg";
import card9 from "../../../assets/Skyintel/Live_sky/card9.jpg";

/* 🔹 Object ID → Image map */
const IMAGE_MAP = {
  "c50": card1,
  "c49": card2,
  "c46": card3,
  "m78": card4,
  "alp-ori": card5,
  "sh2-267": card6,
  "zet-ori": card7,
  "ic343": card8,
  "gam-gam": card9
};

const ObjectCard = ({ object }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/skyintel/live_sky/object/${object.id}`);
  };

  const imageSrc = IMAGE_MAP[object.id];

  return (
    <div className="object-card">

      <div className="object-card-image">
        <img
          src={imageSrc}
          alt={object.displayName}
        />
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
