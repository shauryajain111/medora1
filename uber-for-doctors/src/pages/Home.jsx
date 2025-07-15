import React from 'react';
import EmergencyRequestForm from '../components/EmergencyRequestForm';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Call a Doctor Urgently</h1>
      <EmergencyRequestForm />
      <Link to="/appointment" className="appointment-link">Or Book an Appointment</Link>
    </div>
  );
}

export default Home;
