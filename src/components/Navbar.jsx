import React, { useState } from 'react';
import { Menu, X, User, LogIn, Phone, Clock, ShieldAlert } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'departments', label: 'Departments' },
  { id: 'appointment', label: 'Book Appointment' },
  { id: 'my-appointments', label: 'My Appointments' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({
  currentPage,
  onNavigate,
  appointmentCount,
  currentUser,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectPage = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-items">
            <span className="top-bar-item">
              <Phone size={13} />
              <span>{HOSPITAL_INFO.phone}</span>
            </span>
            <span className="top-bar-item">
              <Clock size={13} />
              <span>{HOSPITAL_INFO.hours}</span>
            </span>
          </div>
          <div className="emergency-pill">
            <ShieldAlert size={13} />
            <span>Emergency: {HOSPITAL_INFO.emergencyPhone}</span>
          </div>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar-inner">
          <button
            type="button"
            className="brand"
            onClick={() => handleSelectPage('home')}
            aria-label="CarePlus Medical Center Home"
          >
            <div className="brand-logo" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="9.5" y="3" width="5" height="18" rx="1.5" fill="currentColor" />
                <rect x="3" y="9.5" width="18" height="5" rx="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">{HOSPITAL_INFO.name}</span>
              <span className="brand-sub">Healthcare Portal</span>
            </div>
          </button>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleSelectPage(item.id)}
              >
                {item.label}
                {item.id === 'my-appointments' && appointmentCount > 0 && (
                  <span className="nav-badge">{appointmentCount}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className={`nav-login-btn ${currentPage === 'login' ? 'active' : ''}`}
              onClick={() => handleSelectPage('login')}
              aria-label={
                currentUser
                  ? `Patient account: ${currentUser.name}`
                  : 'Patient Login or Register'
              }
            >
              {currentUser ? <User size={16} /> : <LogIn size={16} />}
              <span className="nav-login-label">
                {currentUser ? currentUser.name.split(' ')[0] : 'Patient Login'}
              </span>
            </button>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
              style={{ textAlign: 'left', width: '100%' }}
              onClick={() => handleSelectPage(item.id)}
            >
              {item.label}
              {item.id === 'my-appointments' && appointmentCount > 0 && (
                <span className="nav-badge">{appointmentCount}</span>
              )}
            </button>
          ))}
          <button
            type="button"
            className={`nav-btn ${currentPage === 'login' ? 'active' : ''}`}
            style={{ textAlign: 'left', width: '100%' }}
            onClick={() => handleSelectPage('login')}
          >
            {currentUser ? `Patient Account (${currentUser.name})` : 'Patient Login / Register'}
          </button>
        </div>
      </header>
    </>
  );
}
