import React from 'react';
import Header from '../components/Header';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Header />
      <main className="home-main">
        <h1>Get Urgent Medical Help at Home</h1>
        <p>Trusted doctors and nurses available 24x7 near you.</p>
        <div className="buttons">
          <button className="primary">Request Emergency Doctor</button>
          <button className="secondary">Schedule Appointment</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
