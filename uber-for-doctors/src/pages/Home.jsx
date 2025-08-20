import React, { useState } from 'react';
import EmergencyRequestForm from '../components/EmergencyRequestForm';
import { Link } from 'react-router-dom';
import './Home.css';

const translations = {
  en: {
    title: "Call a Doctor Urgently",
    appointment: "Or Book an Appointment",
    nurseButton: "Request a Nurse"
  },
  hi: {
    title: "डॉक्टर को तुरंत बुलाएं",
    appointment: "या अपॉइंटमेंट बुक करें",
    nurseButton: "नर्स को बुलाएं"
  },
  pa: {
    title: "ਡਾਕਟਰ ਨੂੰ ਤੁਰੰਤ ਬੁਲਾਓ",
    appointment: "ਜਾਂ ਮੀਟਿੰਗ ਬੁਕ ਕਰੋ",
    nurseButton: "ਨਰਸ ਨੂੰ ਬੁਲਾਓ"
  }
};

function Home({ selectedLanguage = 'en' }) {
  const [showNurseForm, setShowNurseForm] = useState(false);

  const t = translations[selectedLanguage] || translations.en;

  return (
    <div className="home">
      <h1>{t.title}</h1>
      
      {/* Doctor Request Form */}
      <EmergencyRequestForm requestType="doctor" />

      {/* Book appointment link */}
      <Link to="/appointment" className="appointment-link">
        {t.appointment}
      </Link>

      {/* Nurse Request */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        {!showNurseForm ? (
          <button
            onClick={() => setShowNurseForm(true)}
            style={{
              padding: '12px 20px',
              fontSize: '1em',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#333',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {t.nurseButton}
          </button>
        ) : (
          <>
            <h2 style={{ marginTop: '20px' }}>Nurse Request</h2>
            <EmergencyRequestForm requestType="nurse" />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
