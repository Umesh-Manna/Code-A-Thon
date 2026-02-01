import SectionLayout from "../components/SectionLayout";
import "./SolarWindActivity.css";

const SolarWindActivity = () => {
  return (
    <SectionLayout
      title="Solar Wind Activity"
      description={
        <>
          The following images present solar wind and geomagnetic activity data
          from the last 24 hours. Elevated solar wind speed and density can
          disturb Earth’s magnetosphere, enhancing geomagnetic activity and
          increasing the likelihood of auroras, sometimes making them visible
          at lower latitudes than usual.
        </>
      }
      attribution="Credit: NOAA Space Weather Prediction Center (SWPC)"
      notes={
        <ol className="solar-wind-notes">
          <li>
            <strong>BZ (nT):</strong> Direction of the solar wind’s magnetic
            field. Southward (negative) values strengthen geomagnetic storms;
            northward values are calmer.
          </li>
          <li>
            <strong>Density (cm³):</strong> Number of charged particles packed
            into space. Higher density means more particles interacting with
            Earth’s magnetosphere.
          </li>
          <li>
            <strong>Speed (km/s):</strong> How fast the solar wind is traveling.
            Faster speeds can lead to stronger space weather effects.
          </li>
          <li>
            <strong>Temperature (K):</strong> Heat of the plasma. Hotter plasma
            generally means faster-moving particles.
          </li>
          <li>
            <strong>Predicted Estimated KP:</strong> A scale from 0–9 indicating
            geomagnetic activity. Higher values mean stronger auroras and
            possible disruptions.
          </li>
          <li>
            <strong>Geospace DST (nT):</strong> Measures storm strength in
            Earth’s magnetic field. Lower values indicate stronger storms.
          </li>
        </ol>
      }
    >
      <div className="solar-wind-grid">
        <figure className="solar-wind-item">
          <img
            src="/solar/solar_wind/solar_wind_24h.png"
            alt="Solar wind activity over the last 24 hours"
            loading="lazy"
          />
          <figcaption>Geospace Timeline – Last 24 Hours</figcaption>
        </figure>

        <figure className="solar-wind-item">
          <img
            src="/solar/solar_wind/solar_wind_3h.png"
            alt="Solar wind activity over the last 3 hours"
            loading="lazy"
          />
          <figcaption>Geospace Timeline – Last 3 Hours</figcaption>
        </figure>
      </div>
    </SectionLayout>
  );
};

export default SolarWindActivity;
