import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle2,
  Trash2,
  CalendarPlus,
} from 'lucide-react';

export default function MyAppointmentsPage({
  appointments,
  currentUser,
  onCancelAppointment,
  onNavigate,
}) {
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancelNotice, setCancelNotice] = useState('');
  const [filterScope, setFilterScope] = useState(currentUser ? 'mine' : 'all');

  const userAppointments = currentUser
    ? appointments.filter(
        (apt) =>
          apt.patientName.toLowerCase() === currentUser.name.toLowerCase() ||
          (currentUser.phone && apt.phone === currentUser.phone)
      )
    : appointments;

  const displayedAppointments =
    currentUser && filterScope === 'mine' ? userAppointments : appointments;

  const handleConfirmCancel = (appointment) => {
    onCancelAppointment(appointment.id);
    setConfirmingId(null);
    setCancelNotice(
      `Appointment ${appointment.id} with ${appointment.doctorName} has been cancelled.`
    );
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>My Appointments</h1>
          <p>
            Review your upcoming consultations, check clinic room details, or cancel an
            appointment if your schedule changes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {cancelNotice && (
            <div className="alert-success" role="status" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <span>{cancelNotice}</span>
                <button
                  type="button"
                  className="btn btn-soft"
                  style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                  onClick={() => setCancelNotice('')}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '22px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 className="section-title" style={{ fontSize: '1.35rem' }}>
                Scheduled Visits ({displayedAppointments.length})
              </h2>
              {currentUser && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    type="button"
                    className={`chip ${filterScope === 'mine' ? 'active' : ''}`}
                    onClick={() => setFilterScope('mine')}
                  >
                    My Bookings ({userAppointments.length})
                  </button>
                  <button
                    type="button"
                    className={`chip ${filterScope === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterScope('all')}
                  >
                    All Bookings ({appointments.length})
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate('appointment')}
            >
              <CalendarPlus size={17} />
              Book Another Appointment
            </button>
          </div>

          {displayedAppointments.length > 0 ? (
            <div style={{ display: 'grid', gap: '16px' }}>
              {displayedAppointments.map((apt) => (
                <article key={apt.id} className="card appointment-card">
                  <div className="appointment-left">
                    <div className="icon-box" style={{ marginBottom: 0, flexShrink: 0 }}>
                      <Calendar size={22} />
                    </div>

                    <div style={{ display: 'grid', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span className="status-pill">
                          <CheckCircle2 size={13} />
                          {apt.status}
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4b647d' }}>
                          ID: {apt.id}
                        </span>
                      </div>

                      <h3 className="card-title" style={{ marginBottom: 0 }}>
                        {apt.doctorName} &mdash;{' '}
                        <span style={{ color: '#1d4ed8' }}>{apt.specialization}</span>
                      </h3>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '16px',
                          fontSize: '0.88rem',
                          color: '#4b647d',
                          marginTop: '4px',
                        }}
                      >
                        <span className="doctor-meta-row">
                          <Calendar size={15} color="#1d4ed8" />
                          <strong>{apt.date}</strong>
                        </span>
                        <span className="doctor-meta-row">
                          <Clock size={15} color="#1d4ed8" />
                          <strong>{apt.timeSlot}</strong>
                        </span>
                        {apt.room && (
                          <span className="doctor-meta-row">
                            <MapPin size={15} color="#1d4ed8" />
                            {apt.room}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '16px',
                          fontSize: '0.85rem',
                          color: '#1e3a5f',
                          marginTop: '2px',
                        }}
                      >
                        <span className="doctor-meta-row">
                          <User size={14} />
                          Patient: {apt.patientName} (Age {apt.age})
                        </span>
                        <span className="doctor-meta-row">
                          <Phone size={14} />
                          {apt.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {confirmingId === apt.id ? (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className="btn btn-danger-outline"
                          style={{ background: '#dc2626', color: '#ffffff', borderColor: '#dc2626' }}
                          onClick={() => handleConfirmCancel(apt)}
                        >
                          Confirm Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-soft"
                          style={{ padding: '9px 14px', fontSize: '0.86rem' }}
                          onClick={() => setConfirmingId(null)}
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger-outline"
                        onClick={() => setConfirmingId(apt.id)}
                      >
                        <Trash2 size={15} />
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3 className="card-title">No Booked Appointments</h3>
              <p className="card-text" style={{ marginBottom: '18px' }}>
                You do not have any upcoming appointments scheduled right now.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onNavigate('appointment')}
              >
                <CalendarPlus size={17} />
                Book Your First Appointment
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
