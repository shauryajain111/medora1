import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RequestStatus from './components/RequestStatus';
import Appointment from './pages/Appointment'; // <-- Import Appointment

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status" element={<RequestStatus />} />
        <Route path="/appointment" element={<Appointment />} /> {/* Add this */}
      </Routes>
    </Router>
  );
}

export default App;
