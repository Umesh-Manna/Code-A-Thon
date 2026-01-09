import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Astrolab from './pages/Astrolab'
import Hurricanes from './pages/Skywatch/Hurricanes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Interactive_maps from './pages/Skywatch/Interactive_maps'
import Our_environment from './pages/Skywatch/Our_environment'

function App() {
  // return (<></> )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/astrolab" element={<Astrolab />} />
        <Route path='/skylabs/hurricanes' element={<Hurricanes />}/>
        <Route path='/skylabs/interactive_maps' element={<Interactive_maps />}/>
        <Route path='/skylabs/our_environment' element={<Our_environment />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
