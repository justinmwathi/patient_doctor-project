import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentsForm';
import '../styles/PatientsDashboard.css';
function PatientDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctors();
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

    const handleScheduleAppointment = (appointmentData) => {
      const formData = new FormData();
      formData.append('doctor_id', appointmentData.doctor_id);
      formData.append('date', appointmentData.date);
      formData.append('time', appointmentData.time);
  
      fetch('http://localhost:5555/appointments', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
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
  
  
  
  

    return (
        <div className="patient-dashboard">
            <h3>Schedule an Appointment</h3>
            <AppointmentForm doctors={doctors} handleScheduleAppointment={handleScheduleAppointment} />
            {error && <p className="error-message">{error}</p>}
            <h3>Appointments</h3>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.doctor.name}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientDashboard;





