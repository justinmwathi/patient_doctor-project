// ScheduleAppointmentForm.js

import React, { useState, useEffect } from 'react';
import '../styles/ScheduleAppointmentForm.css';

const ScheduleAppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5555/doctors');
        if (response.ok) {
          const doctorData = await response.json();
          setDoctors(doctorData);
        } else {
          console.error('Failed to fetch doctors');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5555/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor_id: selectedDoctorId, date }),
      });
      if (response.ok) {
        // Handle success, e.g., show confirmation to the user
        console.log('Appointment scheduled successfully');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  return (
    <div className="schedule-appointment-form">
      <h3>Schedule Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Doctor:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
};

export default ScheduleAppointmentForm;
