import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data/hospitalData';

export default function Footer({ onNavigate, onSelectDepartment }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{HOSPITAL_INFO.name}</h4>
            <p style={{ color: '#bfdbfe', fontSize: '0.92rem', maxWidth: '340px' }}>
              {HOSPITAL_INFO.tagline} Dedicated to delivering trusted, patient-first
              clinical excellence with streamlined online appointment scheduling.
            </p>
            <div style={{ marginTop: '14px', display: 'grid', gap: '8px', fontSize: '0.88rem' }}>
              <span className="top-bar-item">
                <MapPin size={15} /> {HOSPITAL_INFO.address}
              </span>
              <span className="top-bar-item">
                <Phone size={15} /> {HOSPITAL_INFO.phone}
              </span>
              <span className="top-bar-item">
                <Mail size={15} /> {HOSPITAL_INFO.email}
              </span>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('home')}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('doctors')}>
                  Find a Doctor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => onNavigate('appointment')}
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => onNavigate('my-appointments')}
                >
                  My Appointments
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('contact')}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>Departments</h4>
            <ul className="footer-links">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onSelectDepartment(dept.id)}
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {HOSPITAL_INFO.name}, Bengaluru, India. All rights reserved.</span>
          <span>24/7 National Emergency &amp; Ambulance Services (108)</span>
        </div>
      </div>
    </footer>
  );
}
