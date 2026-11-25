import React, { useState } from 'react';
import { LogIn, UserPlus, LogOut, UserCheck, CalendarPlus, ClipboardList } from 'lucide-react';

export default function LoginPage({
  currentUser,
  onLogin,
  onRegister,
  onLogout,
  onNavigate,
}) {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setAuthError('');
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
    setAuthError('');
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'register') {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        newErrors.name = 'Please enter your full name.';
      }
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      const result = onLogin(formData.email.trim(), formData.password);
      if (!result.success) {
        setAuthError(result.message);
      } else {
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const result = onRegister({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      if (!result.success) {
        setAuthError(result.message);
      } else {
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLogoutClick = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setMode('login');
    setErrors({});
    setAuthError('');
    onLogout();
  };

  const fillDemoCredentials = () => {
    setMode('login');
    setErrors({});
    setAuthError('');
    setFormData((prev) => ({
      ...prev,
      email: 'patient@careplus.in',
      password: 'password123',
    }));
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Patient Portal</h1>
          <p>
            Sign in or register a patient account to auto-fill appointment bookings and
            manage your visits seamlessly.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="auth-wrapper">
            {currentUser ? (
              <div className="form-card" style={{ textAlign: 'center' }}>
                <div className="icon-box" style={{ margin: '0 auto 16px', width: 58, height: 58 }}>
                  <UserCheck size={28} />
                </div>
                <span className="doctor-dept-badge">Signed In</span>
                <h2 className="card-title" style={{ fontSize: '1.4rem', marginTop: '6px' }}>
                  Welcome, {currentUser.name}
                </h2>
                <p className="card-text" style={{ marginBottom: '20px' }}>
                  {currentUser.email}
                  {currentUser.phone ? ` • ${currentUser.phone}` : ''}
                </p>

                <div style={{ display: 'grid', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onNavigate('appointment')}
                  >
                    <CalendarPlus size={18} />
                    Book New Appointment
                  </button>
                  <button
                    type="button"
                    className="btn btn-soft"
                    onClick={() => onNavigate('my-appointments')}
                  >
                    <ClipboardList size={18} />
                    Go to My Appointments
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger-outline"
                    style={{ marginTop: '6px' }}
                    onClick={handleLogoutClick}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-card">
                <div className="auth-tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'login'}
                    className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                    onClick={() => switchMode('login')}
                  >
                    Patient Login
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'register'}
                    className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
                    onClick={() => switchMode('register')}
                  >
                    Register
                  </button>
                </div>

                {authError && <div className="alert-error">{authError}</div>}

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {mode === 'register' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="authName" className="form-label">
                            Full Name
                          </label>
                          <input
                            id="authName"
                            type="text"
                            className={`form-control ${errors.name ? 'has-error' : ''}`}
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                          />
                          {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="authPhone" className="form-label">
                            Mobile Phone Number
                          </label>
                          <input
                            id="authPhone"
                            type="tel"
                            className={`form-control ${errors.phone ? 'has-error' : ''}`}
                            placeholder="e.g., +91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                          />
                          {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>
                      </>
                    )}

                    <div className="form-group">
                      <label htmlFor="authEmail" className="form-label">
                        Email Address
                      </label>
                      <input
                        id="authEmail"
                        type="email"
                        className={`form-control ${errors.email ? 'has-error' : ''}`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="authPassword" className="form-label">
                        Password
                      </label>
                      <input
                        id="authPassword"
                        type="password"
                        className={`form-control ${errors.password ? 'has-error' : ''}`}
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                      />
                      {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {mode === 'register' && (
                      <div className="form-group">
                        <label htmlFor="authConfirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          id="authConfirmPassword"
                          type="password"
                          className={`form-control ${
                            errors.confirmPassword ? 'has-error' : ''
                          }`}
                          placeholder="Re-enter your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        />
                        {errors.confirmPassword && (
                          <span className="error-text">{errors.confirmPassword}</span>
                        )}
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      {mode === 'login' ? (
                        <>
                          <LogIn size={18} /> Sign In
                        </>
                      ) : (
                        <>
                          <UserPlus size={18} /> Create Patient Account
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {mode === 'login' && (
                  <div
                    style={{
                      marginTop: '20px',
                      padding: '14px',
                      background: '#eaf3ff',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      color: '#1e3a5f',
                    }}
                  >
                    <p style={{ marginBottom: '8px' }}>
                      <strong>Demo Patient Account (India):</strong> patient@careplus.in /{' '}
                      password123
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                      onClick={fillDemoCredentials}
                    >
                      Fill Demo Credentials
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
