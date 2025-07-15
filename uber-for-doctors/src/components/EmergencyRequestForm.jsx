import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './EmergencyRequestForm.css';

function EmergencyRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    symptoms: '',
    emergencyLevel: 'moderate'
  });

  const [recommendation, setRecommendation] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let reco = '';
    if (formData.emergencyLevel === 'critical') {
      reco = 'Lie the patient down. Call for ambulance if unresponsive.';
    } else if (formData.emergencyLevel === 'moderate') {
      reco = 'Ensure patient is resting. Avoid exertion.';
    } else {
      reco = 'Monitor condition. Doctor will arrive shortly.';
    }

    setRecommendation(reco);
    console.log('Form Submitted:', formData);
    navigate('/status');
  };

  return (
    <div className="emergency-form-wrapper">
      <h2>{t('requestEmergency')}</h2>
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
          name="symptoms"
          placeholder="Describe Symptoms"
          value={formData.symptoms}
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

        <button type="submit">{t('submitRequest')}</button>
      </form>

      {recommendation && (
        <div className="recommendation-box">
          <strong>AI Recommendation:</strong>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default EmergencyRequestForm;
