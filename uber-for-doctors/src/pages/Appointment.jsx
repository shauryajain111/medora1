import React, { useState } from 'react';
import './Appointment.css';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    doctor: 'Dr. Priya Sharma'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
    alert('Appointment successfully scheduled!');
  };

  return (
    <div className="appointment-wrapper">
      <h2>Schedule an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="label">Select Doctor:</label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
        >
          <option>Dr. Priya Sharma</option>
          <option>Dr. Rahul Mehra</option>
          <option>Dr. Aisha Khan</option>
        </select>

        <label className="label">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className="label">Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Appointment;
