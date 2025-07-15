import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmergencyRequestForm.css';

function EmergencyRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    symptoms: '',
    emergencyLevel: 'moderate'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const symptomRecord = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      symptoms: formData.symptoms
    };

    console.log('SAVE THIS JSON TO FILE:', JSON.stringify(symptomRecord, null, 2));

    navigate('/status', { state: { patient: formData } });
  };

  return (
    <div className="emergency-form-wrapper">
      <form className="emergency-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="chief_complaint"
          placeholder="Describe Symptoms"
          value={formData.chief_complaint}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>

        <label className="label">Emergency Level:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="emergencyLevel"
              value="mild"
              checked={formData.emergencyLevel === 'mild'}
              onChange={handleChange}
            />
            Mild
          </label>
          <label>
            <input
              type="radio"
              name="emergencyLevel"
              value="moderate"
              checked={formData.emergencyLevel === 'moderate'}
              onChange={handleChange}
            />
            Moderate
          </label>
          <label>
            <input
              type="radio"
              name="emergencyLevel"
              value="critical"
              checked={formData.emergencyLevel === 'critical'}
              onChange={handleChange}
            />
            Critical
          </label>
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default EmergencyRequestForm;
