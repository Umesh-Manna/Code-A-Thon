

import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero.jsx';
import Login from './components/Login.jsx';
import Events from './screens/Events.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Milestones from './screens/Milestones.jsx';

/* Umesh's imports */

// import './App.css'
import Astrolab1 from '../Space-scope/src/pages/Astrolab/Astrolab1.jsx' 

import Hurricanes from '../Space-scope/src/pages/Skywatch/Hurricanes.jsx' 
import { BrowserRouter} from 'react-router-dom'
import Interactive_maps from '../Space-scope/src/pages/Skywatch/Interactive_maps.jsx'
import Our_environment from '../Space-scope/src/pages/Skywatch/Our_environment.jsx'

import Satellites from '../Space-scope/src/pages/Skyintel/Satellites/Satellites'
import Live_sky from '../Space-scope/src/pages/Skyintel/live_sky/Live_sky.jsx'
import ObjectView from '../Space-scope/src/pages/Skyintel/live_sky/ObjectView.jsx'
import MoonDashboard from '../Space-scope/src/Lunar_moon/MoonDashboard.jsx'

import SolarDataCardsPage from "../Space-scope/src/Solar_data/pages/SolarDataCardsPage.jsx";

// hurricane maps imported 
import HurricaneMap from "./screens/HurricaneMap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<Events />} />
      {/* Fallback route */}
      <Route path="/milestones" element={<Milestones />} />
      <Route path="*" element={<Navigate to="/" />} />

      {/* Umesh's imports */}

      {/* astrolab */}
        <Route path="/astrolab" element={<Astrolab1 />} />

        {/* Sky-watch */}
        <Route path='/skywatch/hurricanes' element={<Hurricanes />}/>
        <Route path='/skywatch/interactive_maps' element={<Interactive_maps />}/>
        <Route path='/skywatch/our_environment' element={<Our_environment />}/>

        {/* skyintel */}
        <Route path='/skyintel/satellite' element={<Satellites/>}></Route>
        <Route
          path="/skyintel/live_sky"
          element={<Live_sky/>}
        />
        <Route
          path="/skyintel/live_sky/object/:objectId"
          element={<ObjectView/>}
        />

        <Route
          path="/skyintel/lunar_view"
          element={<MoonDashboard/>}
        />

        <Route
          path="/skyintel/solar_data"
          element={<SolarDataCardsPage />}
        />

        <Route
          path="/skywatch/hurricanes-map"
          element={<HurricaneMap/>}
        />
    </Routes>



    
  );
};

export default App;



