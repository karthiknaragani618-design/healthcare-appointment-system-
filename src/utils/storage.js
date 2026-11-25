const APPOINTMENTS_KEY = 'careplus_in_appointments_v2';
const USERS_KEY = 'careplus_in_users_v2';
const SESSION_KEY = 'careplus_in_current_user_v2';
const CONTACT_KEY = 'careplus_in_contact_messages_v2';

const getTomorrowDateString = (daysAhead = 1) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SEED_APPOINTMENTS = [
  {
    id: 'APT-1042',
    patientName: 'Aarav Sharma',
    age: '34',
    phone: '+91 98765 43210',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rajesh K. Sharma',
    specialization: 'Cardiology',
    room: 'OPD Block A, Room 204',
    date: getTomorrowDateString(2),
    timeSlot: '10:00 AM',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'APT-1043',
    patientName: 'Aarav Sharma',
    age: '34',
    phone: '+91 98765 43210',
    doctorId: 'doc-7',
    doctorName: 'Dr. Kavita Nair',
    specialization: 'Dermatology',
    room: 'Dermatology Clinic, Room 218',
    date: getTomorrowDateString(5),
    timeSlot: '02:00 PM',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
];

export function loadAppointments() {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (raw === null) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(SEED_APPOINTMENTS));
      return SEED_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAppointments(appointments) {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const defaultUser = [
        {
          id: 'usr-demo',
          name: 'Aarav Sharma',
          email: 'patient@careplus.in',
          password: 'password123',
          phone: '+91 98765 43210',
        },
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage errors
  }
}

export function loadCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export function saveContactInquiry(inquiry) {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = [inquiry, ...(Array.isArray(existing) ? existing : [])];
    localStorage.setItem(CONTACT_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}
