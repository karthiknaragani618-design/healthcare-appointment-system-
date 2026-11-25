import React, { useState } from 'react';
import {
  Search,
  CalendarPlus,
  ArrowRight,
  Ambulance,
  Microscope,
  Stethoscope,
  ClipboardCheck,
  Pill,
  ShieldCheck,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';
import { HOSPITAL_INFO, SERVICES, DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import DoctorCard from '../components/DoctorCard';

const SERVICE_ICONS = {
  Ambulance,
  Microscope,
  Stethoscope,
  ClipboardCheck,
  Pill,
  ShieldCheck,
};

export default function HomePage({
  onNavigate,
  onSearchDoctors,
  onBookDoctor,
  onSelectDepartment,
}) {
  const [query, setQuery] = useState('');

  const trimmedQuery = query.trim().toLowerCase();
  const matchedDoctors = trimmedQuery
    ? DOCTORS.filter(
        (doc) =>
          doc.name.toLowerCase().includes(trimmedQuery) ||
          doc.specialization.toLowerCase().includes(trimmedQuery) ||
          doc.role.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearchDoctors(query.trim());
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-pill">
              <HeartPulse size={16} />
              <span>Welcome to {HOSPITAL_INFO.name}</span>
            </div>
            <h1>Trusted Healthcare &amp; Seamless Appointment Booking</h1>
            <p className="hero-subtitle">
              Connect with board-certified specialists across five core medical departments,
              check real-time doctor schedules, and confirm your visit in under a minute.
            </p>

            <form className="hero-search-box" onSubmit={handleSearchSubmit}>
              <div className="hero-search-input-wrap">
                <Search size={19} />
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Search doctors by name or specialization (e.g., Cardiology, Rajesh, Priya)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search doctors"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search Doctors
              </button>
            </form>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                style={{ background: '#ffffff', color: '#0f2942' }}
                onClick={() => onNavigate('appointment')}
              >
                <CalendarPlus size={18} />
                Book Appointment
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
                onClick={() => onNavigate('departments')}
              >
                Explore Departments
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <aside className="hero-card" aria-label="Hospital highlights">
            <div className="hero-card-header">
              <div className="brand-logo" style={{ width: 40, height: 40 }}>
                <Stethoscope size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.08rem', fontWeight: 700 }}>Patient-First Care</h2>
                <p style={{ fontSize: '0.84rem', color: '#4b647d' }}>{HOSPITAL_INFO.tagline}</p>
              </div>
            </div>

            <div className="hero-stat-grid">
              <div className="hero-stat-box">
                <div className="hero-stat-value">{DOCTORS.length}+</div>
                <div className="hero-stat-label">Specialist Doctors</div>
              </div>
              <div className="hero-stat-box">
                <div className="hero-stat-value">{DEPARTMENTS.length}</div>
                <div className="hero-stat-label">Core Departments</div>
              </div>
              <div className="hero-stat-box">
                <div className="hero-stat-value">24/7</div>
                <div className="hero-stat-label">Emergency Support</div>
              </div>
              <div className="hero-stat-box">
                <div className="hero-stat-value">Instant</div>
                <div className="hero-stat-label">Online Confirmation</div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '8px', fontSize: '0.88rem', color: '#1e3a5f' }}>
              <div className="doctor-meta-row">
                <CheckCircle2 size={16} color="#1d4ed8" />
                <span>Verified doctor timings &amp; easy slot selection</span>
              </div>
              <div className="doctor-meta-row">
                <CheckCircle2 size={16} color="#1d4ed8" />
                <span>Manage or cancel bookings anytime in My Appointments</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Live Search Preview when typing on Home */}
        {trimmedQuery && (
          <div className="container">
            <div className="home-search-results">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <h3 style={{ color: '#0f2942', fontSize: '1.08rem' }}>
                  Matching Doctors ({matchedDoctors.length})
                </h3>
                <button
                  type="button"
                  className="btn btn-soft"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  onClick={() => onSearchDoctors(query.trim())}
                >
                  View All on Doctors Page
                </button>
              </div>

              {matchedDoctors.length > 0 ? (
                <div className="grid-3">
                  {matchedDoctors.slice(0, 3).map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBookDoctor={onBookDoctor}
                    />
                  ))}
                </div>
              ) : (
                <p style={{ color: '#4b647d' }}>
                  No doctors found matching &ldquo;{query}&rdquo;. Try searching Cardiology,
                  Neurology, Orthopedics, Dermatology, or Pediatrics.
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Hospital Services */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-kicker">Hospital Services</span>
              <h2 className="section-title">Comprehensive Care Under One Roof</h2>
              <p className="section-desc">
                From preventive health screenings to emergency interventions, {HOSPITAL_INFO.name}{' '}
                combines modern technology with compassionate medical teams.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onNavigate('doctors')}
            >
              Meet Our Doctors
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {SERVICES.map((service) => {
              const IconComponent = SERVICE_ICONS[service.icon] || Stethoscope;
              return (
                <article key={service.id} className="card">
                  <div className="icon-box">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-text">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Departments Quick Strip */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-kicker">Specialized Care</span>
              <h2 className="section-title">Our Medical Departments</h2>
              <p className="section-desc">
                Select a department to view available specialists and schedule your consultation.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-soft"
              onClick={() => onNavigate('departments')}
            >
              All Departments
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {DEPARTMENTS.map((dept) => (
              <article key={dept.id} className="card">
                <span className="doctor-dept-badge">{dept.floor}</span>
                <h3 className="card-title">{dept.name}</h3>
                <p className="card-text" style={{ marginBottom: '16px' }}>
                  {dept.description}
                </p>
                <button
                  type="button"
                  className="btn btn-soft"
                  style={{ width: '100%' }}
                  onClick={() => onSelectDepartment(dept.id)}
                >
                  View {dept.name} Doctors
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
