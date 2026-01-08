import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Astrolab from './pages/Astrolab'
import Skywatch from './pages/Skywatch'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // return (<></> )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/astrolab" element={<Astrolab />} />
        <Route path='/skywatch' element={<Skywatch />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
