import LatestUltravioletImages from "../sections/LatestUltravioletImages";
import LatestPhotosphereImage from "../sections/LatestPhotosphereImage";
import CurrentSolarActivityOverview from "../sections/CurrentSolarActivityOverview";
import CoronalMassEjection from "../sections/CoronalMassEjection";
import AuroraForecast from "../sections/AuroraForecast";
import SolarWindActivity from "../sections/SolarWindActivity";
import ThreeDaySolarForecast from "../sections/ThreeDaySolarForecast";


import SolarCard from "../components/SolarCard";
import "./SolarDataCardsPage.css";

const SolarDataCardsPage = () => {
  return (
    <div className="solar-cards-page">
      {/* Section 1 */}
      <SolarCard>
        <LatestUltravioletImages />
      </SolarCard>

      {/* Section 2 */}
      <SolarCard>
        <LatestPhotosphereImage />
      </SolarCard>

      {/* Section 3 */}
      <SolarCard>
        <CurrentSolarActivityOverview />
      </SolarCard>

      {/* Section 4 */}
      <SolarCard>
        <CoronalMassEjection />
      </SolarCard>

      <SolarCard>
        <AuroraForecast />
      </SolarCard>

      <SolarCard>
        <SolarWindActivity />
      </SolarCard>

      <SolarCard>
        <ThreeDaySolarForecast />
      </SolarCard>
    </div>
  );
};

export default SolarDataCardsPage;
