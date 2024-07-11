import React, { useState, useEffect } from 'react';
//import ScheduleAppointment from './ScheduleAppointment';
//import PatientProfileUpdate from './PatientProfileUpdate';
import '../styles/Patients.css';

const PatientDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5555/session', {
          method: 'GET',
          credentials: 'include', // Include credentials for CORS
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="patient-dashboard">
      <h2>Patient Dashboard</h2>
      {isLoggedIn ? (
        <>
       {/*   <PatientProfileUpdate />*/}
        {/*  <ScheduleAppointment />*/}
        </>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default PatientDashboard;


