# CarePlus Medical Center — Healthcare Appointment Management System

A responsive, beginner-friendly Healthcare Appointment Management System built with React, Vite, HTML, CSS, and JavaScript.

## Features

- **Home Page**: Hospital branding & logo, welcome banner, live doctor search, Book Appointment shortcut, hospital services, and department previews.
- **Doctors Page**: Doctor profiles with specialization, qualification, experience, available timings, clinic room, department filter chips, search bar, and **Book Now** action.
- **Departments Page**: Dedicated sections for Cardiology, Neurology, Orthopedics, Dermatology, and Pediatrics with treatments, floor location, and specialist counts.
- **Appointment Booking Page**: Validated booking form (Patient Name, Age, Phone Number, Doctor selector, Date picker, Time Slot selector), double-booking prevention, confirmation banner, and `localStorage` persistence.
- **Patient Login & Registration**: Login and registration tabs with validation, `localStorage` account/session storage, and a one-click demo patient sign-in (`patient@careplus.org` / `password123`).
- **My Appointments Page**: Displays scheduled appointments from `localStorage` with doctor details, date/time, and two-step **Cancel Appointment** confirmation.
- **Contact Page**: Hospital address, phone numbers, email, visiting hours, and a validated contact form.

## Running Locally

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```
