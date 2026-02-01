// src/Solar_data/sections/CoronalMassEjection.jsx

import SectionLayout from "../components/SectionLayout";
import "./CoronalMassEjection.css";

const CoronalMassEjection = () => {
  return (
    <SectionLayout
      title="Coronal Mass Ejections (CMEs)"
      description={
        <>
          These are the latest images tracking <strong>Coronal Mass Ejections (CMEs)</strong>,
          massive bursts of solar wind and magnetic fields released into space.
          The Sun is always shielded in these images by the <strong>GOES / LASCO</strong> instruments
          to block its brightness, allowing the dimmer corona and CMEs to be visible.
        </>
      }
      attribution="Credit: NOAA / ESA / NASA"
      notes={
        <>
          <h3 className="cme-notes-title">
            Don’t Just Watch the CMEs—Look for Comets Too!
          </h3>
          <p>
            While most eyes are on coronal mass ejections (CMEs) in LASCO timelapse
            imagery, don’t miss the smaller, fast-moving objects—comets plunging
            toward the Sun. SOHO has discovered thousands of these sungrazing
            comets using its LASCO instruments.
          </p>
          <p>
            They often appear as bright streaks or dots darting into the Sun’s glare.
            These fleeting visitors offer a fascinating glimpse into the dynamic
            environment around our star—so keep an eye out for more than just
            solar eruptions.
          </p>
        </>
      }
    >
      <div className="cme-grid">
        <figure className="cme-item">
          <img
            src="/solar/cme/cme_lasco_c2.jpg"
            alt="CME observed by LASCO C2"
            loading="lazy"
          />
          <figcaption>LASCO C2 – Inner Corona</figcaption>
        </figure>

        <figure className="cme-item">
          <img
            src="/solar/cme/cme_lasco_blue.gif"
            alt="CME observed in blue spectrum"
            loading="lazy"
          />
          <figcaption>LASCO – Enhanced CME View</figcaption>
        </figure>

        <figure className="cme-item cme-item--center">
          <img
            src="/solar/cme/cme_lasco_c3.jpg"
            alt="CME observed by LASCO C3"
            loading="lazy"
          />
          <figcaption>LASCO C3 – Outer Corona</figcaption>
        </figure>
      </div>
    </SectionLayout>
  );
};

export default CoronalMassEjection;
