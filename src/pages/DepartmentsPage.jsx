import React from 'react';
import {
  HeartPulse,
  Brain,
  Bone,
  Sparkles,
  Baby,
  Users,
  ArrowRight,
  CalendarPlus,
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';

const DEPT_ICONS = {
  HeartPulse,
  Brain,
  Bone,
  Sparkles,
  Baby,
};

export default function DepartmentsPage({ onSelectDepartment, onNavigateToBooking }) {
  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Medical Departments</h1>
          <p>
            Dedicated clinical departments equipped with modern diagnostic suites and
            experienced multidisciplinary teams.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {DEPARTMENTS.map((dept) => {
              const IconComponent = DEPT_ICONS[dept.icon] || HeartPulse;
              const doctorCount = DOCTORS.filter(
                (doc) => doc.specialization === dept.id
              ).length;

              return (
                <article key={dept.id} className="card">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <div className="icon-box">
                      <IconComponent size={25} />
                    </div>
                    <span className="doctor-dept-badge">{dept.floor}</span>
                  </div>

                  <h2 className="card-title" style={{ fontSize: '1.3rem' }}>
                    {dept.name}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#1d4ed8',
                      marginBottom: '10px',
                    }}
                  >
                    {dept.subtitle}
                  </p>
                  <p className="card-text">{dept.description}</p>

                  <ul className="dept-treatments">
                    {dept.treatments.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap',
                      paddingTop: '14px',
                      borderTop: '1px solid #d7e6fb',
                    }}
                  >
                    <span
                      className="doctor-meta-row"
                      style={{ fontSize: '0.88rem', color: '#4b647d', fontWeight: 600 }}
                    >
                      <Users size={16} color="#1d4ed8" />
                      {doctorCount} Available Specialists
                    </span>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-soft"
                        style={{ padding: '9px 15px', fontSize: '0.86rem' }}
                        onClick={() => onSelectDepartment(dept.id)}
                      >
                        View Doctors
                        <ArrowRight size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ padding: '9px 15px', fontSize: '0.86rem' }}
                        onClick={() => onNavigateToBooking(dept.id)}
                      >
                        <CalendarPlus size={15} />
                        Book Visit
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
