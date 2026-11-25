import React from 'react';
import { Search, X } from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import DoctorCard from '../components/DoctorCard';

export default function DoctorsPage({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  onBookDoctor,
}) {
  const departmentOptions = ['All', ...DEPARTMENTS.map((d) => d.id)];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesDept =
      selectedDepartment === 'All' || doctor.specialization === selectedDepartment;
    const matchesSearch =
      !normalizedQuery ||
      doctor.name.toLowerCase().includes(normalizedQuery) ||
      doctor.specialization.toLowerCase().includes(normalizedQuery) ||
      doctor.role.toLowerCase().includes(normalizedQuery);
    return matchesDept && matchesSearch;
  });

  const handleChipClick = (dept) => {
    onDepartmentChange(dept);
    const matchesAnotherDeptName = DEPARTMENTS.some(
      (d) => d.id.toLowerCase() === normalizedQuery && d.id !== dept
    );
    if (matchesAnotherDeptName) {
      onSearchChange('');
    }
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Our Medical Specialists</h1>
          <p>
            Browse doctor profiles, check clinic availability, and book your appointment
            directly with your preferred physician.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="search-input-group">
              <Search size={18} color="#4b647d" />
              <input
                type="text"
                placeholder="Search doctor name or specialty..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Filter doctors by name or specialty"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#4b647d',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    padding: '2px',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="chip-group" role="group" aria-label="Filter by department">
              {departmentOptions.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  className={`chip ${selectedDepartment === dept ? 'active' : ''}`}
                  onClick={() => handleChipClick(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid-3">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookDoctor={onBookDoctor}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3 className="card-title">No Doctors Match Your Filter</h3>
              <p className="card-text" style={{ marginBottom: '18px' }}>
                Try clearing your search term or switching back to All departments.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onSearchChange('');
                  onDepartmentChange('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
