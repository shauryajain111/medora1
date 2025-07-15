import React from 'react';
import './Header.css';

function Header({ onLanguageChange }) {
  return (
    <header className="header">
      <div className="logo">DoctorOnCall</div>
      <select
        className="language-select"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
      </select>
    </header>
  );
}

export default Header;
