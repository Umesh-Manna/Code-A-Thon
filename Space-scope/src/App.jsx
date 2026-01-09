import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Astrolab from './pages/Astrolab'
import Skywatch from './pages/Skywatch'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Skywatch_IM from './pages/Skywatch_IM'

function App() {
  // return (<></> )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/astrolab" element={<Astrolab />} />
        <Route path='/skywatch' element={<Skywatch />}/>
        <Route path='/skywatch_im' element={<Skywatch_IM />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
