import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { saveContactInquiry } from '../utils/storage';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name.';
    }
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    saveContactInquiry({
      id: `MSG-${Date.now()}`,
      ...formData,
      submittedAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Contact {HOSPITAL_INFO.name}</h1>
          <p>
            Reach out to our patient support desk for scheduling assistance, medical
            records, or general hospital inquiries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col-layout">
          <div className="form-card">
            <h2 className="card-title" style={{ fontSize: '1.3rem', marginBottom: '6px' }}>
              Send Us a Message
            </h2>
            <p className="card-text" style={{ marginBottom: '22px' }}>
              Our care coordinators typically reply within one business day.
            </p>

            {submitted && (
              <div className="alert-success" role="status" style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                  <CheckCircle2 size={20} />
                  <span>Thank you! Your message has been received.</span>
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                  Our front desk team will get back to you via email shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contactName" className="form-label">
                    Your Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    className={`form-control ${errors.name ? 'has-error' : ''}`}
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    className={`form-control ${errors.email ? 'has-error' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contactSubject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="contactSubject"
                    type="text"
                    className={`form-control ${errors.subject ? 'has-error' : ''}`}
                    placeholder="Appointment inquiry, billing, or feedback"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contactMessage" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contactMessage"
                    rows="5"
                    className={`form-control ${errors.message ? 'has-error' : ''}`}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                <Send size={17} />
                Send Message
              </button>
            </form>
          </div>

          <aside style={{ display: 'grid', gap: '18px' }}>
            <div className="card">
              <div className="icon-box">
                <MapPin size={22} />
              </div>
              <h3 className="card-title">Hospital Address</h3>
              <p className="card-text">{HOSPITAL_INFO.address}</p>
            </div>

            <div className="card">
              <div className="icon-box">
                <Phone size={22} />
              </div>
              <h3 className="card-title">Phone &amp; Emergency</h3>
              <p className="card-text">
                <strong>Main Desk:</strong> {HOSPITAL_INFO.phone}
                <br />
                <strong>24/7 Emergency:</strong> {HOSPITAL_INFO.emergencyPhone}
              </p>
            </div>

            <div className="card">
              <div className="icon-box">
                <Mail size={22} />
              </div>
              <h3 className="card-title">Email &amp; Hours</h3>
              <p className="card-text">
                <strong>Email:</strong> {HOSPITAL_INFO.email}
                <br />
                <span className="doctor-meta-row" style={{ marginTop: '6px' }}>
                  <Clock size={15} color="#1d4ed8" />
                  {HOSPITAL_INFO.hours}
                </span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
