import React from "react";
import SectionLayout from "../components/SectionLayout";
import "./LatestPhotosphereImage.css";

const LatestPhotosphereImage = () => {
  return (
    <SectionLayout
      title="Latest Photosphere Image of the Sun"
      description={
        <>
          A sunspot is a dark, cooler region on the Sun’s surface caused by
          intense magnetic activity. These regions are often associated with
          solar flares and coronal mass ejections, which can influence space
          weather near Earth.
          <br />
          <br />
          For scale, Earth and Jupiter are shown in comparison, highlighting
          the immense size of the Sun and its sunspots. Continuous observation
          of the photosphere helps scientists monitor solar cycles and
          anticipate solar activity.
        </>
      }
      attribution="Sunspot Activity on the Sun’s Photosphere (SDO – HMI; cached locally)"
    >
      <div className="photosphere-container">
        <img
          src="/solar/photosphere_today.png"
          alt="Latest photosphere image of the Sun showing sunspots"
          className="photosphere-image"
          loading="lazy"
        />
      </div>
    </SectionLayout>
  );
};

export default LatestPhotosphereImage;
