import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import AppointmentPage from './pages/AppointmentPage';
import LoginPage from './pages/LoginPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import ContactPage from './pages/ContactPage';
import { DOCTORS } from './data/hospitalData';
import {
  loadAppointments,
  saveAppointments,
  loadUsers,
  saveUsers,
  loadCurrentUser,
  saveCurrentUser,
} from './utils/storage';

const VALID_PAGES = new Set([
  'home',
  'doctors',
  'departments',
  'appointment',
  'login',
  'my-appointments',
  'contact',
]);

const getInitialPage = () => {
  const hash = window.location.hash.replace('#', '');
  return VALID_PAGES.has(hash) ? hash : 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [appointments, setAppointments] = useState(loadAppointments);
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);

  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState(DOCTORS[0].id);

  useEffect(() => {
    const handleHashChange = () => {
      const next = window.location.hash.replace('#', '');
      if (VALID_PAGES.has(next)) {
        setCurrentPage(next);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchDoctors = (query) => {
    setDoctorSearchQuery(query);
    setSelectedDepartment('All');
    navigateTo('doctors');
  };

  const handleSelectDepartment = (deptId) => {
    setSelectedDepartment(deptId);
    setDoctorSearchQuery('');
    navigateTo('doctors');
  };

  const handleBookDoctor = (doctor) => {
    setPreselectedDoctorId(doctor.id);
    navigateTo('appointment');
  };

  const handleBookDept = (deptId) => {
    const firstDoctor = DOCTORS.find((doc) => doc.specialization === deptId);
    if (firstDoctor) {
      setPreselectedDoctorId(firstDoctor.id);
    }
    navigateTo('appointment');
  };

  const handleCreateAppointment = (newAppointment) => {
    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updated = appointments.filter((apt) => apt.id !== appointmentId);
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handleLogin = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }
    const sessionUser = { id: found.id, name: found.name, email: found.email, phone: found.phone };
    setCurrentUser(sessionUser);
    saveCurrentUser(sessionUser);
    return { success: true };
  };

  const handleRegister = ({ name, phone, email, password }) => {
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (alreadyExists) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      phone,
      email,
      password,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone };
    setCurrentUser(sessionUser);
    saveCurrentUser(sessionUser);
    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
  };

  return (
    <div className="app-shell">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        appointmentCount={appointments.length}
        currentUser={currentUser}
      />

      <main className="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSearchDoctors={handleSearchDoctors}
            onBookDoctor={handleBookDoctor}
            onSelectDepartment={handleSelectDepartment}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            searchQuery={doctorSearchQuery}
            onSearchChange={setDoctorSearchQuery}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            onBookDoctor={handleBookDoctor}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsPage
            onSelectDepartment={handleSelectDepartment}
            onNavigateToBooking={handleBookDept}
          />
        )}

        {currentPage === 'appointment' && (
          <AppointmentPage
            preselectedDoctorId={preselectedDoctorId}
            currentUser={currentUser}
            existingAppointments={appointments}
            onBookAppointment={handleCreateAppointment}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            currentUser={currentUser}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onLogout={handleLogout}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'my-appointments' && (
          <MyAppointmentsPage
            appointments={appointments}
            currentUser={currentUser}
            onCancelAppointment={handleCancelAppointment}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigateTo} onSelectDepartment={handleSelectDepartment} />
    </div>
  );
}
