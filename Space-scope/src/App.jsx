import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Astrolab1 from './pages/Astrolab/Astrolab1'
import Hurricanes from './pages/Skywatch/Hurricanes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Interactive_maps from './pages/Skywatch/Interactive_maps'
import Our_environment from './pages/Skywatch/Our_environment'
import Satellites from './pages/Skyintel/Satellites/Satellites'

function App() {
  // return (<></> )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/astrolab" element={<Astrolab1 />} />
        <Route path='/skywatch/hurricanes' element={<Hurricanes />}/>
        <Route path='/skywatch/interactive_maps' element={<Interactive_maps />}/>
        <Route path='/skywatch/our_environment' element={<Our_environment />}/>
        <Route path='/skyintel/satellite' element={<Satellites/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
