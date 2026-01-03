import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Astrolab from './pages/Astrolab'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // return (<></> )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Astrolab />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
