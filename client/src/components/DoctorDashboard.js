import React, { useState, useEffect } from 'react';
import '../styles/DoctorDashboard.css'; // Import your CSS file
import '../styles/DoctorDashboard.css'; // Import your CSS file

const DoctorDashboard = () => {
  const userName = localStorage.getItem('userName');
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
  });

    useEffect(() => {
        fetch('/appointments')
            .then(response => response.json())
            .then(data => setAppointments(data));
    }, []);
  useEffect(() => {
    fetch('http://localhost:5555/appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }, []);

    const handleEditClick = (appointment) => {
        setEditingAppointment(appointment);
        setFormData({
            patient_id: appointment.patient_id,
            doctor_id: appointment.doctor_id,
            appointment_date: appointment.date,
            appointment_time: appointment.time
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch(`/appointments/${editingAppointment.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(updatedAppointment => {
            setAppointments(prevAppointments => prevAppointments.map(appt => 
                appt.id === updatedAppointment.id ? updatedAppointment : appt
            ));
            setEditingAppointment(null);
            setFormData({
                patient_id: '',
                doctor_id: '',
                appointment_date: '',
                appointment_time: ''
            });
        });
    };
 
    return (
        <div className="container">
            <h2>Doctor Dashboard</h2>
            <h3>Welcome Dr.{userName}</h3>
            {editingAppointment && (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Patient ID:</label>
                        <input 
                            type="text" 
                            name="patient_id" 
                            value={formData.patient_id} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label>Doctor ID:</label>
                        <input 
                            type="text" 
                            name="doctor_id" 
                            value={formData.doctor_id} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label>Appointment Date:</label>
                        <input 
                            type="date" 
                            name="appointment_date" 
                            value={formData.appointment_date} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label>Appointment Time:</label>
                        <input 
                            type="time" 
                            name="appointment_time" 
                            value={formData.appointment_time} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            )}
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.date} {appointment.time} - Patient ID: {appointment.patient_id} - Doctor ID: {appointment.doctor_id}
                        <button onClick={() => handleEditClick(appointment)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
  
};

export default DoctorDashboard;
