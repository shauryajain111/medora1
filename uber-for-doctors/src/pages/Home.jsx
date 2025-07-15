import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import EmergencyRequestForm from '../components/EmergencyRequestForm';
import './Home.css';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home">
      <Header />
      <main className="home-main">
        <h1>{t('heading')}</h1>
        <p>{t('subtitle')}</p>

        <EmergencyRequestForm />

        <div className="buttons">
          <Link to="/appointment">
            <button className="secondary">{t('scheduleAppointment')}</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
