import React, { useState } from 'react';

const AppointmentForm = ({ doctors, handleScheduleAppointment }) => {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleScheduleAppointment({
            doctor_id: selectedDoctor,
            date: selectedDate,
            time: selectedTime,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                onChange={(e) => setSelectedDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
            />
            <button type="submit">Schedule Appointment</button>
        </form>
    );
};

export default AppointmentForm;
