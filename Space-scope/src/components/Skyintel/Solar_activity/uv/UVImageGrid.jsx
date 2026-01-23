import React from "react";
import UVImageCard from "./UVImageCard";
import wavelengths from "../../../../data/Solar_activity/wavelengths";
import useSUVIImages from "../../../../hooks/Solar_activity/useSUVIImages";
import { formatUTCTime } from "../../../../utils/Skyintel/Solar_activity/time/formatUTCTime";   

const UVImageGrid = () => {
  const { images, isLoading } = useSUVIImages();

  return (
    <div className="uv-image-grid">
      {wavelengths.map((wave) => {
        const liveData = images[wave.wavelength];

        return (
          <UVImageCard
            key={wave.wavelength}
            wavelength={wave.wavelength}
            label={wave.label}
            description={wave.description}
            imageUrl={liveData?.imageUrl || null}
            timestamp={
              liveData?.timestamp
                ? formatUTCTime(liveData.timestamp)
                : null
            }
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default UVImageGrid;
