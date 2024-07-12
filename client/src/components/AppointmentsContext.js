// AppointmentsContext.js
import React, { createContext, useState } from 'react';

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const handleAppointmentScheduling = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const handleAppointmentApproval = (id) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, approved: true } : appointment
      )
    );
  };

  const handleAppointmentDeletion = (id) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        handleAppointmentScheduling,
        handleAppointmentApproval,
        handleAppointmentDeletion,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsContext;
