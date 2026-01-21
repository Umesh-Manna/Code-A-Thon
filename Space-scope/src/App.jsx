import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Astrolab1 from './pages/Astrolab/Astrolab1'
import Hurricanes from './pages/Skywatch/Hurricanes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Interactive_maps from './pages/Skywatch/Interactive_maps'
import Our_environment from './pages/Skywatch/Our_environment'

import Satellites from './pages/Skyintel/Satellites/Satellites'
import Live_sky from './pages/Skyintel/live_sky/Live_sky'



function App() {
  // return (<></> )

  return (
    <BrowserRouter>
      <Routes>
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
        {/* <Route
          path="/solar-activity"
          element={<Placeholder title="Real-time Solar Activity" />}
        />
         <Route
          path="/lunar-eclipse"
          element={<Placeholder title="Lunar Eclipse" />}
        />
        
        <Route
          path="/tonights-best"
          element={<Placeholder title="Tonight’s Best" />}
        />
        <Route
          path="/notifications"
          element={<Placeholder title="Notifications" />}
        /> */}

      </Routes>

    </BrowserRouter>
  )
}

export default App
