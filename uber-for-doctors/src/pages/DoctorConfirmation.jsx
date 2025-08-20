import React from "react";
import { useLocation } from "react-router-dom";
import "./DoctorConfirmation.css";

function DoctorConfirmation() {
  const location = useLocation();
  const { doctor } = location.state || {};

  if (!doctor) {
    return <div className="confirmation-page">No doctor selected.</div>;
  }

  return (
    <div className="confirmation-page">
      <h2>Appointment Confirmed</h2>
      <div className="doctor-info">
        <img src={doctor.photo} alt={doctor.name} />
        <h3>{doctor.name}</h3>
        <p>{doctor.hospital}</p>
        <p>Contact: {doctor.phone}</p>
      </div>
    </div>
  );
}

export default DoctorConfirmation;
