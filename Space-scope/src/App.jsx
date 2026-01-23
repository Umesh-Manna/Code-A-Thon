// import { Routes, Route } from 'react-router-dom'
// import Home from './screens/Home.jsx'
// import Login from './components/Login.jsx'

// const App = () => {
//   return (
//     <>
//       {/* Removed undefined AuthProvider and Navbar to stop the crash */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </>
//   )
// }

// export default App

import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero.jsx';
import Login from './components/Login.jsx';
import Events from './screens/Events.jsx';
import Dashboard from './screens/Dashboard.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<Events />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;