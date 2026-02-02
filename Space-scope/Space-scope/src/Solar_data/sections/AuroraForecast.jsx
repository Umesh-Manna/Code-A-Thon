import SectionLayout from "../components/SectionLayout";
import "./AuroraForecast.css";

const AuroraForecast = () => {
  return (
    <SectionLayout
      title="Aurora Forecast"
      description={
        <>
          These images display the current aurora forecast, based on solar wind
          conditions and geomagnetic activity. The yellow and red regions
          indicate a higher probability of aurora visibility in the northern and
          southern hemispheres. Auroras are beautiful light displays caused by
          solar particles interacting with Earth’s magnetic field, producing
          vibrant, flowing colors in the sky.
        </>
      }
      attribution="Credit: NOAA Ongoing Variations in the Ionosphere–Thermosphere Aurora Model"
    >
      <div className="aurora-grid">
        <figure className="aurora-item">
          <img
            src="/solar/aurora/aurora_north.jpg"
            alt="Northern Hemisphere aurora forecast"
            loading="lazy"
          />
          <figcaption>Northern Hemisphere Aurora Forecast</figcaption>
        </figure>

        <figure className="aurora-item">
          <img
            src="/solar/aurora/aurora_south.jpg"
            alt="Southern Hemisphere aurora forecast"
            loading="lazy"
          />
          <figcaption>Southern Hemisphere Aurora Forecast</figcaption>
        </figure>
      </div>
    </SectionLayout>
  );
};

export default AuroraForecast;
