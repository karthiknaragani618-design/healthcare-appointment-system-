import React from 'react';
import { Award, Clock, MapPin, CalendarPlus } from 'lucide-react';

export default function DoctorCard({ doctor, onBookDoctor }) {
  return (
    <article className="card doctor-card">
      <div>
        <div className="doctor-top">
          <div className="doctor-avatar" aria-hidden="true">
            {doctor.initials}
          </div>
          <div>
            <span className="doctor-dept-badge">{doctor.specialization}</span>
            <h3 className="card-title" style={{ marginBottom: '2px' }}>
              {doctor.name}
            </h3>
            <p className="card-text" style={{ fontSize: '0.86rem' }}>
              {doctor.role} &bull; {doctor.qualification}
            </p>
          </div>
        </div>

        <div className="doctor-meta" style={{ marginTop: '16px' }}>
          <div className="doctor-meta-row">
            <Award size={16} color="#1d4ed8" />
            <span>
              <strong>Experience:</strong> {doctor.experience}
            </span>
          </div>
          <div className="doctor-meta-row">
            <Clock size={16} color="#1d4ed8" />
            <span>
              <strong>Available:</strong> {doctor.timings}
            </span>
          </div>
          <div className="doctor-meta-row">
            <MapPin size={16} color="#1d4ed8" />
            <span>
              <strong>Clinic:</strong> {doctor.room}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%' }}
        onClick={() => onBookDoctor(doctor)}
      >
        <CalendarPlus size={17} />
        Book Now
      </button>
    </article>
  );
}
