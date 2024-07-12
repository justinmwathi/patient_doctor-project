import React, { useState, useEffect } from 'react';
import '../styles/Patients.css';

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch doctors on component mount
    fetchDoctors();

    // Fetch appointments on component mount
    fetchAppointments();
  }, []);

  const fetchDoctors = () => {
    fetch('http://localhost:5555/doctors', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  };

  const fetchAppointments = () => {
    fetch('http://localhost:5555/appointments', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching appointments:', error));
  };
 
  const handleScheduleAppointment = (e) => {
    e.preventDefault();

    const loggedInUserId = localStorage.getItem('loggedInUserId'); // Retrieve loggedInUserId

    fetch('http://localhost:5555/appointments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doctor_id: selectedDoctor,
        patient_id: loggedInUserId, // Use loggedInUserId here
        date: selectedDate,
        time: selectedTime,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.error || 'Failed to schedule appointment');
          });
        }
        return response.json();
      })
      .then(appointment => {
        setAppointments([...appointments, appointment]);
        setError('');
        fetchDoctors(); // Refresh doctors list after scheduling appointment
      })
      .catch(error => {
        setError(error.message);
        console.error('Error scheduling appointment:', error);
      });
  };

  // Function to filter doctors by availability
  const getBusyDatesForDoctor = (doctorId) => {
    const doctorAppointments = appointments.filter(appt => appt.doctor_id === doctorId);
    return doctorAppointments.map(appt => appt.date);
  };

  return (
    <div className="patient-dashboard">
      <h3>Schedule an Appointment</h3>
      <form onSubmit={handleScheduleAppointment} className="appointment-form">
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            console.log(e.target.value); // Log selectedDate when the value changes
          }}
          required
        
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
        />
        <button type="submit">Schedule Appointment</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <h3>Doctor Availability</h3>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            Dr. {doctor.name}: Busy on {getBusyDatesForDoctor(doctor.id).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDashboard;




