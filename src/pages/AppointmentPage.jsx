import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Stethoscope,
  MapPin,
  ArrowRight,
  Info,
} from 'lucide-react';
import { DOCTORS, DEFAULT_TIME_SLOTS } from '../data/hospitalData';

const getTodayInputValue = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function AppointmentPage({
  preselectedDoctorId,
  currentUser,
  existingAppointments,
  onBookAppointment,
  onNavigate,
}) {
  const [formData, setFormData] = useState({
    patientName: currentUser?.name || '',
    age: '',
    phone: currentUser?.phone || '',
    doctorId: preselectedDoctorId || DOCTORS[0].id,
    date: getTodayInputValue(),
    timeSlot: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (preselectedDoctorId) {
      setFormData((prev) => ({
        ...prev,
        doctorId: preselectedDoctorId,
        timeSlot: '',
      }));
    }
  }, [preselectedDoctorId]);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        patientName: prev.patientName || currentUser.name,
        phone: prev.phone || currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  const selectedDoctor = DOCTORS.find((doc) => doc.id === formData.doctorId) || DOCTORS[0];
  const availableSlots = selectedDoctor?.slots || DEFAULT_TIME_SLOTS;

  const bookedSlotsForSelection = existingAppointments
    .filter(
      (apt) => apt.doctorId === formData.doctorId && apt.date === formData.date
    )
    .map((apt) => apt.timeSlot);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'doctorId' || field === 'date' ? { timeSlot: '' } : {}),
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedName = formData.patientName.trim();
    const numericAge = Number(formData.age);
    const digitsOnlyPhone = formData.phone.replace(/\D/g, '');
    const today = getTodayInputValue();

    if (!trimmedName || trimmedName.length < 2) {
      newErrors.patientName = 'Please enter the patient’s full name (at least 2 characters).';
    }

    if (!formData.age || Number.isNaN(numericAge) || numericAge < 1 || numericAge > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120.';
    }

    if (digitsOnlyPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number (e.g., 9876543210 or +91 98765 43210).';
    }

    if (!formData.doctorId) {
      newErrors.doctorId = 'Please select a doctor.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select an appointment date.';
    } else if (formData.date < today) {
      newErrors.date = 'Appointment date cannot be in the past.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select an available time slot.';
    } else if (bookedSlotsForSelection.includes(formData.timeSlot)) {
      newErrors.timeSlot = 'This time slot is already booked. Please choose another.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const newAppointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: formData.patientName.trim(),
      age: String(formData.age).trim(),
      phone: formData.phone.trim(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      room: selectedDoctor.room,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onBookAppointment(newAppointment);
    setConfirmedBooking(newAppointment);
    setFormData((prev) => ({
      ...prev,
      age: '',
      timeSlot: '',
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>
            Complete the patient details below to schedule your consultation with a
            CarePlus specialist.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {confirmedBooking && (
            <div className="alert-success" role="status" aria-live="polite">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <CheckCircle2 size={24} />
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Appointment Confirmed! ({confirmedBooking.id})
                </h2>
              </div>
              <p>
                Your booking has been saved. Please arrive 10 minutes before your scheduled
                slot.
              </p>

              <div className="confirmation-details">
                <div>
                  <strong>Patient:</strong> {confirmedBooking.patientName} (Age{' '}
                  {confirmedBooking.age})
                </div>
                <div>
                  <strong>Phone:</strong> {confirmedBooking.phone}
                </div>
                <div>
                  <strong>Doctor:</strong> {confirmedBooking.doctorName}
                </div>
                <div>
                  <strong>Department:</strong> {confirmedBooking.specialization} ({confirmedBooking.room})
                </div>
                <div>
                  <strong>Date:</strong> {confirmedBooking.date}
                </div>
                <div>
                  <strong>Time Slot:</strong> {confirmedBooking.timeSlot}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onNavigate('my-appointments')}
                >
                  View My Appointments
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setConfirmedBooking(null)}
                >
                  Dismiss Notice
                </button>
              </div>
            </div>
          )}

          <div className="two-col-layout">
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <h2 className="card-title" style={{ fontSize: '1.3rem', marginBottom: '6px' }}>
                Patient &amp; Schedule Details
              </h2>
              <p className="card-text" style={{ marginBottom: '22px' }}>
                All fields are required to confirm your appointment.
              </p>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="patientName" className="form-label">
                    Patient Full Name
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    className={`form-control ${errors.patientName ? 'has-error' : ''}`}
                    placeholder="Enter patient's full name"
                    value={formData.patientName}
                    onChange={(e) => handleFieldChange('patientName', e.target.value)}
                  />
                  {errors.patientName && (
                    <span className="error-text">{errors.patientName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="patientAge" className="form-label">
                    Age (Years)
                  </label>
                  <input
                    id="patientAge"
                    type="number"
                    min="1"
                    max="120"
                    className={`form-control ${errors.age ? 'has-error' : ''}`}
                    placeholder="e.g., 32"
                    value={formData.age}
                    onChange={(e) => handleFieldChange('age', e.target.value)}
                  />
                  {errors.age && <span className="error-text">{errors.age}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="patientPhone" className="form-label">
                    Mobile Phone Number
                  </label>
                  <input
                    id="patientPhone"
                    type="tel"
                    className={`form-control ${errors.phone ? 'has-error' : ''}`}
                    placeholder="e.g., +91 98765 43210 or 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="doctorSelect" className="form-label">
                    Select Doctor
                  </label>
                  <select
                    id="doctorSelect"
                    className={`form-control ${errors.doctorId ? 'has-error' : ''}`}
                    value={formData.doctorId}
                    onChange={(e) => handleFieldChange('doctorId', e.target.value)}
                  >
                    {DOCTORS.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.specialization} ({doc.experience})
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && <span className="error-text">{errors.doctorId}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="appointmentDate" className="form-label">
                    Select Appointment Date
                  </label>
                  <input
                    id="appointmentDate"
                    type="date"
                    min={getTodayInputValue()}
                    className={`form-control ${errors.date ? 'has-error' : ''}`}
                    value={formData.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <div className="form-group full-width">
                  <span className="form-label">Select Time Slot</span>
                  <div className="slot-grid">
                    {availableSlots.map((slot) => {
                      const isBooked = bookedSlotsForSelection.includes(slot);
                      const isSelected = formData.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          className={`slot-btn ${isSelected ? 'selected' : ''}`}
                          style={
                            isBooked
                              ? {
                                  opacity: 0.48,
                                  cursor: 'not-allowed',
                                  textDecoration: 'line-through',
                                }
                              : undefined
                          }
                          onClick={() => handleFieldChange('timeSlot', slot)}
                          title={isBooked ? 'Already booked for this date' : `Select ${slot}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {errors.timeSlot && <span className="error-text">{errors.timeSlot}</span>}
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <CalendarCheck size={18} />
                  Confirm Appointment
                </button>
              </div>
            </form>

            {/* Selected Doctor Summary Panel */}
            <aside className="card" style={{ position: 'sticky', top: '96px' }}>
              <span className="doctor-dept-badge">{selectedDoctor.specialization}</span>
              <div className="doctor-top" style={{ marginTop: '6px' }}>
                <div className="doctor-avatar">{selectedDoctor.initials}</div>
                <div>
                  <h3 className="card-title" style={{ marginBottom: '2px' }}>
                    {selectedDoctor.name}
                  </h3>
                  <p className="card-text" style={{ fontSize: '0.86rem' }}>
                    {selectedDoctor.role}
                  </p>
                  <p className="card-text" style={{ fontSize: '0.82rem' }}>
                    {selectedDoctor.qualification} &bull; {selectedDoctor.experience}
                  </p>
                </div>
              </div>

              <div className="doctor-meta" style={{ marginTop: '18px' }}>
                <div className="doctor-meta-row">
                  <Clock size={16} color="#1d4ed8" />
                  <span>{selectedDoctor.timings}</span>
                </div>
                <div className="doctor-meta-row">
                  <MapPin size={16} color="#1d4ed8" />
                  <span>{selectedDoctor.room}</span>
                </div>
                <div className="doctor-meta-row">
                  <Stethoscope size={16} color="#1d4ed8" />
                  <span>In-person outpatient consultation</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '18px',
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#eaf3ff',
                  fontSize: '0.86rem',
                  color: '#1e3a5f',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <Info size={18} color="#1d4ed8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Appointments are stored locally in your browser so you can review or
                  cancel them anytime on the <strong>My Appointments</strong> page.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
