import React from 'react';
import './RequestStatus.css';

function RequestStatus() {
  // For MVP, we can hardcode or simulate this data
  const doctor = {
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    experience: '8 years',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    etaMinutes: 15
  };

  return (
    <div className="request-status-wrapper">
      <h2>Doctor En Route</h2>
      <p>Estimated arrival in <strong>{doctor.etaMinutes} minutes</strong>.</p>

      <div className="doctor-card">
        <img src={doctor.photo} alt="Doctor" className="doctor-photo" />
        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
          <p>{doctor.experience} experience</p>
        </div>
      </div>

      <button className="call-button">Call Doctor</button>
    </div>
  );
}

export default RequestStatus;
